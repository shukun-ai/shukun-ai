cd ..
DOCKER_BUILDKIT=1 docker build -t shukun-ai/ailake-api:latest --platform=linux/amd64 --no-cache -f Dockerfile --target api .
DOCKER_BUILDKIT=1 docker build -t shukun-ai/ailake-web:latest --platform=linux/amd64 --no-cache -f Dockerfile --target web .
