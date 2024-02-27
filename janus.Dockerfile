FROM ubuntu:18.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    libmicrohttpd-dev \
    libjansson-dev \
    libssl-dev \
    libsofia-sip-ua-dev \
    libglib2.0-dev \
    libopus-dev \
    libogg-dev \
    libcurl4-openssl-dev \
    liblua5.3-dev \
    libconfig-dev \
    pkg-config \
    gengetopt \
    libtool \
    automake \
    gtk-doc-tools \
    git

# Clone Janus source code
WORKDIR /root
RUN git clone https://github.com/meetecho/janus-gateway.git

# Build and install Janus
WORKDIR /root/janus-gateway
RUN sh autogen.sh
RUN ./configure
RUN make
RUN make install
RUN make configs

# Expose the necessary ports
EXPOSE 8088 8188 7088 7089

# Start Janus server
CMD ["/usr/local/bin/janus"]