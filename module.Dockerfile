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

RUN apt-get update && apt-get install netcat-openbsd -y

WORKDIR /home
ENV HOME /home
SHELL ["/bin/bash", "-c"]

ENV PATH="/workspace/venv/bin:$PATH"
RUN echo "source /workspace/venv/bin/activate" >> .bashrc

COPY scripts/module-create.sh /home/module-create.sh

ENTRYPOINT ["sh", "/home/module-create.sh"]
CMD ["/bin/bash"]