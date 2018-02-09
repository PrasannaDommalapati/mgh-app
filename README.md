# Docker, Docker DOCKER!!

## App

```bash
docker build -f docker/app/Dockerfile -t hotels/app .
docker push hotels/app

```

## e2e

```bash
docker build -f docker/e2e/Dockerfile -t hotels/e2e .
docker push hotels/e2e

```