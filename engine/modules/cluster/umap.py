import pandas as pd
from sklearn.datasets import load_digits
from sklearn.cluster import DBSCAN
from umap import UMAP
from hdbscan import HDBSCAN, approximate_predict
import pickle
class SingletonInstane:
  __instance = None

  @classmethod
  def __getInstance(cls):
    return cls.__instance

  @classmethod
  def instance(cls, *args, **kargs):
    cls.__instance = cls(*args, **kargs)
    cls.instance = cls.__getInstance
    return cls.__instance

class UmapCluster(SingletonInstane):
  def __init__(self, data = load_digits().data):
    self.data = data
    self.umap_model = None
    self.cluster_model = None

  def set_data(self, data):
    self.data = data

  def init_umap(self, min_dist=0.1, n_neighbors=15, n_components=2):
    self.umap_model = UMAP(min_dist=min_dist, n_neighbors=n_neighbors, n_components=n_components, verbose=True)
    return True
  
  def save_umap(self, file_name):
    pickle.dump(self.umap_model, open(file_name, 'wb'))
    return True
  
  def load_umap(self, file_name):
    self.umap_model = pickle.load((open(file_name, 'rb')))
    return True
  
  def save_cluster(self, file_name):
    pickle.dump(self.cluster_model, open(file_name, 'wb'))
    return True
  
  def load_cluster(self, file_name):
    self.cluster_model = pickle.load((open(file_name, 'rb')))
    return True

  def fit_umap(self):
    self.umap_model = self.umap_model.fit(self.data)
    
    self.transfromed = self.umap_model.transform(self.data)
    return self.transfromed

  def transfrom_umap(self, data):
    if(self.umap_model):
      return self.umap_model.transform(data)
    else:
      return None
    
  def init_cluster(self, min_cluster_size=2, min_samples=20):
    self.cluster_model = HDBSCAN(min_cluster_size=min_cluster_size, min_samples=min_samples, prediction_data=True, gen_min_span_tree=True)
    return True
  
  def fit_cluster(self, ):
    self.cluster_model = self.cluster_model.fit(self.transfromed)
    return self.cluster_model.labels_, self.cluster_model.probabilities_
  
  def predict_cluster(self, data):
    if(self.cluster_model):
      labels_, probabilities_ = approximate_predict(self.cluster_model, data)
      return labels_, probabilities_
    else:
      return None, None
