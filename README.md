docker build -f ./redis.Dockerfile -t {docker_hub_id}/{repo_name}:{version} .
docker push {docker_hub_id}/{repo_name}:{version}
docker pull {docker_hub_id}/{repo_name}:{version}

docker volume create saige_workspace
docker volume inspect saige_workspace
docker volume remove saige_workspace

docker-compose -f ./docker-compose.yaml up -d
docker-compose -f ./docker-compose.yaml down
docker-compose -f ./docker-compose.yaml start redis
docker-compose -f ./docker-compose.yaml stop redis

