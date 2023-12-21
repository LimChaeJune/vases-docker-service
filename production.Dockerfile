FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /root
ENV HOME /root
SHELL ["/bin/bash", "-c"]

ENV PATH="/workspace/venv/bin:$PATH"
RUN echo "source /workspace/venv/bin/activate" >> .bashrc

COPY src/engine /root
COPY /scripts/run.sh /root/run.sh
ENTRYPOINT ["/bin/bash", "-c", "/root/run.sh \"$@\"", "--"]
CMD ["/bin/bash"]