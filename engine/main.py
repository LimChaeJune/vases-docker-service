from fastapi import FastAPI
import socketio
import uvicorn
from modules.cluster.umap import UmapCluster
from models import UmapOptions, ClusterOptions, UmapData, FastSamOptions, FastSamAnnotation, FastSamResponse, LoadSaveOptions
from pydantic import BaseModel

from modules.fastsam import FastSAM, FastSAMPrompt, utils

from PIL import Image
import base64
from io import BytesIO
import torch
import cv2
import numpy as np

print(torch.cuda.is_available())

def handle_connect(sid, environ):
	print(f"socket connected with sid {sid}")

class SocketManager:
	def __init__(self):
		self.server = socketio.AsyncServer(
			cors_allowed_origins=["*"],
			async_mode="asgi",
			logger=True,
			engineio_logger=True,
		)
		self.app = socketio.ASGIApp(self.server, socketio_path='sockets')

	@property
	def on(self):
		return self.server.on

	@property
	def send(self):
		return self.server.send

	def mount_to(self, path: str, app):
		app.mount(path, self.app)


def _format_results(result, filter=0):
	annotations = []
	n = len(result.masks.data)
	for i in range(n):
		annotation = {}
		mask = result.masks.data[i] == 1.0

		if torch.sum(mask) < filter:
				continue
		annotation['id'] = i
		annotation['segmentation'] = mask.cpu().numpy()
		annotation['bbox'] = result.boxes.data[i]
		annotation['score'] = result.boxes.conf[i]
		annotation['area'] = annotation['segmentation'].sum()
		annotations.append(annotation)
	return annotations

if __name__ == "__main__":
	socket_manager = SocketManager()
	socket_manager.on("connect", handler=handle_connect)

	app = FastAPI(root_path="/engine/v1")

	fsam_model = FastSAM('./FastSAM-s.pt')

	@app.post("/dimension/save")
	def save_umap(options: LoadSaveOptions):
		return UmapCluster.save_umap(options.file_name)
	
	@app.post('/dimension/load')
	def load_umap(options:LoadSaveOptions):
		return UmapCluster.load_umap(options.file_name)

	@app.post("/dimension/init")
	def setdata(options:UmapOptions):
		return UmapCluster.instance().init_umap(options.min_dist, options.n_neighbors)

	@app.post("/dimension/data")
	def setdata(options:UmapData):
		_data = []
		for _base64 in options.base64_list:
			input = Image.open(BytesIO(base64.b64decode(_base64)))
			input = input.convert("RGB")
			input = input.resize((options.width,options.height))
			img_nd_array = utils.image_to_np_ndarray(input)
			_data.append(img_nd_array.reshape(-1))
		return UmapCluster.instance().set_data(_data)

	@app.post("/dimension/fit")
	def fit_dimension():
		cluster = UmapCluster.instance()
		transformed = cluster.fit_umap()
		return transformed.tolist()
	
	@app.post('/dimension/reduce')
	def reduce_dimension(options:UmapData):
		cluster = UmapCluster.instance()
		transformed = cluster.transfrom_umap(options.data)
		return [] if transformed is None else transformed.tolist()
	
	@app.post('/cluster/save')
	def save_cluster(options:LoadSaveOptions):
		return UmapCluster.save_cluster(options.file_name)
	
	@app.post('/cluster/load')
	def save_cluster(options:LoadSaveOptions):
		return UmapCluster.load_cluster(options.file_name)
	
	@app.post('/cluster/init')
	def init_cluster(options:ClusterOptions):
		return UmapCluster.instance().init_cluster(min_cluster_size=options.min_cluster_size, min_samples=options.min_samples)
	
	@app.post('/cluster/fit')
	def fit_cluster():
		cluster = UmapCluster.instance()
		results, scores = cluster.fit_cluster()
		return [results.tolist(), scores.tolist()]
	
	@app.post('/cluster/predict')
	def predict_cluster(options:UmapData):
		cluster = UmapCluster.instance()
		results, scores = cluster.predict_cluster(options.data)
		return [] if results is None else [results.tolist(), scores.tolist()]
	
	@app.post('/segment/anything')
	def fast_segment(args:FastSamOptions):
		input = Image.open(BytesIO(base64.b64decode(args.base64)))
		input = input.convert("RGB")
		img_nd_array = utils.image_to_np_ndarray(input)
		image = cv2.cvtColor(img_nd_array, cv2.COLOR_BGR2RGB)	
		origin_w = image.shape[1]
		origin_h = image.shape[0]

		device = torch.device(
			args.device
		)
		everything_results = fsam_model(
			input,
			device=device,
			retina_masks=args.retina,
			imgsz=args.imgsz,
			conf=args.confidence,
			iou=args.iou,
			mode=args.mode
		)
		results = []
		if(everything_results is not None):
			annotations = _format_results(everything_results[0], 0)
			
			for i, mask in enumerate(annotations):
				if type(mask) == dict:
					_mask = mask['segmentation']
					annotation = _mask.astype(np.uint8)
					annotation = cv2.resize(annotation, (origin_w, origin_h), interpolation=cv2.INTER_NEAREST)
					contours, hierarchy = cv2.findContours(annotation, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
					if len(contours) > 0:
						x1, y1, w, h = cv2.boundingRect(contours[0])
						x2 = x1 + w
						y2 = y1 + h
						contour_arr = [];
						for i in range(len(contours)):
							if len(contours[i]) >= 3:
								contour = contours[i]
								x_t, y_t, w_t, h_t = cv2.boundingRect(contour)
								x1 = min(x1, x_t)
								y1 = min(y1, y_t)
								x2 = max(x2, x_t + w_t)
								y2 = max(y2, y_t + h_t)
								contour_arr.append(contour.tolist())
						h = y2 - y1
						w = x2 - x1
						bounding_box = [x1, y1, w, h]
						
						results.append(FastSamAnnotation(id=mask['id'], bounding_box=bounding_box, score=mask['score'], area=mask['area'], contours=contour_arr))

		return FastSamResponse(annotations=results, width=origin_w, height=origin_h)

	
	socket_manager.mount_to("/engine/v1", app)
	uvicorn.run(app, host="0.0.0.0", port=40000)
		
