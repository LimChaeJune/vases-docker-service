FROM python:3.8
# FROM nvidia/cuda:12.3.1-base-ubuntu20.04

# Sets utf-8 encoding for Python et al
ENV LANG=C.UTF-8
# Turns off writing .pyc files; superfluous on an ephemeral container.
ENV PYTHONDONTWRITEBYTECODE=1
# Seems to speed things up
ENV PYTHONUNBUFFERED=1

RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

WORKDIR /home
ENV HOME /home
SHELL ["/bin/bash", "-c"]

RUN mkdir -p /workspace/venv

ENV PATH="/workspace/venv/bin:$PATH"
RUN echo "source /workspace/venv/bin/activate" >> .bashrc

COPY /engine /home
COPY ./scripts/venv-init.sh /home/venv-init.sh

ENTRYPOINT ["sh", "/home/venv-init.sh", "$PORT"]
CMD ["/bin/bash"]