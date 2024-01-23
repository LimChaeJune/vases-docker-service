FROM python:3.8
 
USER root

# Sets utf-8 encoding for Python et al
ENV LANG=C.UTF-8
# Turns off writing .pyc files; superfluous on an ephemeral container.
ENV PYTHONDONTWRITEBYTECODE=1
# Seems to speed things up
ENV PYTHONUNBUFFERED=1

RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

RUN apt-get update
RUN apt-get upgrade -y
 
# container에 git 설치
RUN apt-get install git -y

WORKDIR /home
ENV HOME /home
SHELL ["/bin/bash", "-c"]

ENV PATH="/workspace/venv/bin:$PATH"
RUN echo "source /workspace/venv/bin/activate" >> .bashrc

COPY scripts/module-init.sh /home/module-init.sh

ENTRYPOINT ["sh", "/home/module-init.sh"]
CMD ["/bin/bash"]