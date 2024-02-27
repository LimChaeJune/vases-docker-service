# Introduction

도커 기반으로 서비스 작성

# Getting Started

1.  Docker commands

- 공통 모듈 및 리소스를 관리하기 위한 스토리지 생성 : docker volume create vases_workspace
- 도커 서비스 시작 : docker-compose -f ./docker-compose.yaml up
- 도커 서비스 중지 : docker-compose -f ./docker-compose.yaml down
- 도커 컨테이너 삭제 : docker rm -f {container_id}
- 도커 이미지 삭제 : docker rmi -f {image_id}
- 도커 이미지 빌드 : docker build -f ./redis.Dockerfile -t {docker_hub_id}/{repo_name}:{version} .
- 도커 허브에 푸쉬 : docker push {docker_hub_id}/{repo_name}:{version}
- 도커 허브에서 풀 : docker pull {docker_hub_id}/{repo_name}:{version}

2. Software dependencies

- docker + docker-compose
- python 3.8
- venv
- redis

3. API documents

- http://localhost:40000/redoc or http://localhost:40000/docs
