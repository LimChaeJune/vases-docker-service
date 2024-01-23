#!/bin/bash

ENVNAME=/workspace/venv

python -m venv $ENVNAME

pip install --upgrade pip
pip install -r requirements.txt

. /workspace/venv/bin/activate
echo $PORT

python main.py