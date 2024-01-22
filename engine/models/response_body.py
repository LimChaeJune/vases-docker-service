from typing import Optional, List, Any
from pydantic import BaseModel, Field

class FastSamAnnotation(BaseModel):
  id:int
  bounding_box:List[float]
  score:float
  contours:List[List[List[List[int]]]]
  area:int


class FastSamResponse(BaseModel):
  annotations: List[FastSamAnnotation]
  width: int
  height: int