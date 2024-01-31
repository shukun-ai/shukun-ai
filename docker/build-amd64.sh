cd ..
DOCKER_BUILDKIT=1 docker build -t shukun-ai/app:latest --platform=linux/amd64 --no-cache -f Dockerfile --target app .
DOCKER_BUILDKIT=1 docker build -t shukun-ai/web:latest --platform=linux/amd64 --no-cache -f Dockerfile --target web .
