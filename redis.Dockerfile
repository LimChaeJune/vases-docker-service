FROM redis:alpine
WORKDIR /redis
COPY conf/redis.conf /usr/local/etc/redis/redis.conf
COPY scripts/redis-init.sh ./init.sh
RUN chmod +x init.sh
