#!/bin/bash

work_dir=/workspace

ENVNAME=/workspace/venv

python -m venv $ENVNAME
. /workspace/venv/bin/activate
pip install --upgrade pip

echo "wait init repo"

while ! nc -z init-repo 8888; do sleep 1; done

echo "start create module"

cd /workspace/SaigeAnomalyDetection
python setup.py build_ext --build-lib deploy
mkdir /workspace/module/SaigeAnomalyDetection
mv /workspace/SaigeAnomalyDetection/deploy/core /workspace/module/SaigeAnomalyDetection/

cd /workspace/SaigeSegmentation2
python setup.py build_ext --build-lib deploy
mkdir /workspace/module/SaigeSegmentation2
mv /workspace/SaigeSegmentation2/deploy/segmentation /workspace/module/SaigeSegmentation2/

cd /workspace/SaigeObjectDetection
python setup.py build_ext --build-lib deploy
mkdir /workspace/module/SaigeObjectDetection
mv /workspace/SaigeObjectDetection/deploy/detection /workspace/module/SaigeObjectDetection/

cd /workspace/SaigeClassification2
python setup.py build_ext --build-lib deploy
mkdir /workspace/module/SaigeClassification2
mv /workspace/SaigeClassification2/deploy/classification /workspace/module/SaigeClassification2/

cd /workspace/SaigeOCR2
python setup.py build_ext --build-lib deploy
mkdir /workspace/module/SaigeOCR2
mv /workspace/SaigeOCR2/deploy/ocr /workspace/module/SaigeOCR2/

cd /workspace/SaigeDefectGeneration
python setup.py build_ext --build-lib deploy
mkdir /workspace/module/SaigeDefectGeneration
mv /workspace/SaigeDefectGeneration/deploy/generation /workspace/module/SaigeDefectGeneration/

cd /workspace/SaigeImageEnhancement
python setup.py build_ext --build-lib deploy
mkdir /workspace/module/SaigeImageEnhancement
mv /workspace/SaigeImageEnhancement/deploy/enhancement /workspace/module/SaigeImageEnhancement/