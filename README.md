# docker-build-metadata-action [![ts](https://github.com/int128/docker-build-metadata-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/docker-build-metadata-action/actions/workflows/ts.yaml)

This action parses the metadata output of https://github.com/docker/build-push-action.

## Getting Started

To build a container image and get the image URI,

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      image-uri: ${{ steps.build-metadata.outputs.image-uri }}
    steps:
      - uses: docker/metadata-action@v5
        id: metadata
        with:
          images: ghcr.io/${{ github.repository }}
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        id: build
        with:
          push: true
          tags: ${{ steps.metadata.outputs.tags }}
          labels: ${{ steps.metadata.outputs.labels }}
      - uses: int128/docker-build-metadata-action@v1
        id: build-metadata
        with:
          metadata: ${{ steps.build.outputs.metadata }}
```

### Inputs

| Name       | Default    | Description                                 |
| ---------- | ---------- | ------------------------------------------- |
| `metadata` | (required) | Output metadata of docker/build-push-action |

### Outputs

| Name        | Description |
| ----------- | ----------- |
| `image-uri` | Image URI   |
