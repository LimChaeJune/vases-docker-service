from typing import Optional
from pydantic import BaseModel, Field
from typing import Optional, List

import torch
import torch.utils._device

class UmapData(BaseModel):
  base64_list: List[str]
  width:int
  height:int

class LoadSaveOptions(BaseModel):
  file_name: str = Field(title='최소 거리', default='./test.sav')

class UmapOptions(BaseModel):
  min_dist: float = Field(title='최소 거리', default=0.1)
  n_neighbors: int = Field(title='근접 갯수', default=15)

class ClusterOptions(BaseModel):
  min_cluster_size: int = Field(title='최소 클러스터 개수', default=2)
  min_samples:int = Field(title='최소 샘플 개수', default=20)


class FastSamOptions(BaseModel):
  base64: str = Field(title='base64 image', default='')
  imgsz: int = Field(title='image size', default=1024)
  iou: float = Field(title='iou threshold for filtering the annotations', default=0.45)
  confidence: float = Field(title='object confidence threshold', default=0.1)
  better_quality: bool = Field(title='better quality using morphologyEx', default=False)
  device:str = Field(title='cuda:[0,1,2,3,4] or cpu', default='cuda:0')
  retina:bool = Field(title='draw high-resolution segmentation masks', default=False)
  withContours:bool = Field(title='draw the edges of the masks', default=False)
  # predict | track
  mode:str = Field(title='draw the edges of the masks', default='predict')