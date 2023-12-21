#!/bin/bash

ENVNAME=/workspace/venv
if [ "$(ls -A $ENVNAME)" ]; then
#	echo Env $ENVNAME exists. skip init.
	source $ENVNAME/bin/activate
	python main.py
else
	echo Env $ENVNAME not exists. init env.
	python -m venv $ENVNAME
	source $ENVNAME/bin/activate
	pip install --upgrade pip
	pip install -r requirements.txt
	python main.py
fi

if [ $# ]; then
	$*
else
	/bin/bash
fi