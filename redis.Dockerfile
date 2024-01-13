FROM redis:alpine

COPY conf/redis.conf /usr/local/etc/redis/redis.conf
COPY scripts/redis-init.sh /home/init.sh

ENTRYPOINT ["/home/init.sh"]
CMD ["/bin/bash"]
