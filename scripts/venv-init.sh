#!/bin/bash

ENVNAME=/workspace/venv

python -m venv $ENVNAME
. /workspace/venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo $PORT

python main.py