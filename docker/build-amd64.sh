cd ..
DOCKER_BUILDKIT=1 docker build -t shukunai/app:latest --platform=linux/amd64 --no-cache -f Dockerfile --target app .
DOCKER_BUILDKIT=1 docker build -t shukunai/web:latest --platform=linux/amd64 --no-cache -f Dockerfile --target web .
