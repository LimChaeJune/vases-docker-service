FROM python:3.8

# Sets utf-8 encoding for Python et al
ENV LANG=C.UTF-8
# Turns off writing .pyc files; superfluous on an ephemeral container.
ENV PYTHONDONTWRITEBYTECODE=1
# Seems to speed things up
ENV PYTHONUNBUFFERED=1

RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

WORKDIR /root
ENV HOME /root
SHELL ["/bin/bash", "-c"]

ENV PATH="/workspace/venv/bin:$PATH"
RUN echo "source /workspace/venv/bin/activate" >> .bashrc

COPY src/engine /root
COPY /scripts/venv-init.sh /root/venv-init.sh

ENTRYPOINT ["/bin/bash", "-c", "/root/venv-init.sh \"$@\"", "--"]
CMD ["/bin/bash"]