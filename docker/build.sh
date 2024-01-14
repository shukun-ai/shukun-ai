cd ..
DOCKER_BUILDKIT=1 docker build -t shukun-ai/ailake-api:latest --no-cache -f Dockerfile --target api .
DOCKER_BUILDKIT=1 docker build -t shukun-ai/ailake-web:latest --no-cache -f Dockerfile --target web .
