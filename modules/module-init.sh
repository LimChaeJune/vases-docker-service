#!/bin/bash

work_dir=/workspace

ENVNAME=/workspace/venv

python -m venv $ENVNAME
. /workspace/venv/bin/activate
pip install --upgrade pip

B64_PAT=$(printf "%s"":$TOKEN" | base64)
git config --global --add http.extraHeader "Authorization: Basic ${B64_PAT}"

if [ ! -d "/workspace/SaigeAnomalyDetection/" ]; then
  cd /workspace
  git clone https://dev.azure.com/SaigeResearch/Research/_git/SaigeAnomalyDetection -b $iad
else
  cd /workspace/SaigeAnomalyDetection
  git checkout tags/$iad
fi

cd ./SaigeAnomalyDetection
git submodule update --init --recursive

if [ ! -d "/workspace/SaigeSegmentation2/" ]; then
  cd /workspace
  git clone https://dev.azure.com/SaigeResearch/Research/_git/SaigeSegmentation2 -b $seg
else
  cd /workspace/SaigeSegmentation2
  git checkout tags/$seg
fi

cd /workspace/SaigeSegmentation2
git submodule update --init --recursive

if [ ! -d "/workspace/SaigeClassification2" ]; then
  cd /workspace
  git clone https://dev.azure.com/SaigeResearch/Research/_git/SaigeClassification2 -b $cls
else
  cd /workspace/SaigeClassification2
  git checkout tags/$cls
fi

cd /workspace/SaigeClassification2
git submodule update --init --recursive


if [ ! -d "/workspace/SaigeObjectDetection" ]; then
  cd /workspace
  git clone https://dev.azure.com/SaigeResearch/Research/_git/SaigeObjectDetection -b $det
else
  cd /workspace/SaigeObjectDetection
  git checkout tags/$det
fi

cd /workspace/SaigeObjectDetection
git submodule update --init --recursive


if [ ! -d "/workspace/SaigeOCR2" ]; then
  cd /workspace
  git clone https://dev.azure.com/SaigeResearch/Research/_git/SaigeOCR2 -b $ocr
else
  cd /workspace/SaigeOCR2
  git checkout tags/$ocr
fi

cd /workspace/SaigeOCR2
git submodule update --init --recursive

if [ ! -d "/workspace/SaigeDefectGeneration" ]; then
  cd /workspace
  git clone https://dev.azure.com/SaigeResearch/Research/_git/SaigeDefectGeneration -b $gen
else
  cd /workspace/SaigeDefectGeneration
  git checkout tags/$gen
fi

cd /workspace/SaigeDefectGeneration
git submodule update --init --recursive


if [ ! -d "workspace/SaigeImageEnhancement" ]; then
  cd /workspace
  git clone https://dev.azure.com/SaigeResearch/Research/_git/SaigeImageEnhancement -b $ien
else
  cd /workspace/SaigeImageEnhancement
  git checkout tags/$ien
fi

cd /workspace/SaigeImageEnhancement
git submodule update --init --recursive

python -m pip install -r /workspace/SaigeAnomalyDetection/requirements.txt -r /workspace/SaigeSegmentation2/requirements.txt -r /workspace/SaigeClassification2/requirements.txt -r /workspace/SaigeObjectDetection/requirements.txt -r /workspace/SaigeOCR2/requirements.txt -r /workspace/SaigeDefectGeneration/requirements.txt -r /workspace/SaigeImageEnhancement/requirements.txt

if [ -d "/workspace/module" ]; then
  rm -rf /workspace/module
fi

mkdir /workspace/module

cd /workspace
python -m http.server $PORT