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

## Specification

This action assumes that the metadata output of `docker/build-push-action` has the following format.

```json
{
  "containerimage.digest": "sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98",
  "image.name": "ghcr.io/int128/kubebuilder-updates:main"
}
```

The output `image-uri` is `ghcr.io/int128/kubebuilder-updates:main@sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98`.

If the metadata has multiple image names, the action returns the image URI with the first image name.
For example,

```json
{
  "containerimage.digest": "sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98",
  "image.name": "ghcr.io/int128/kubebuilder-updates:v1.0.0,ghcr.io/int128/kubebuilder-updates:latest"
}
```

The output `image-uri` is `ghcr.io/int128/kubebuilder-updates:v1.0.0@sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98`.

If any of the metadata is missing, the action returns no output.

### Inputs

| Name       | Default    | Description                                 |
| ---------- | ---------- | ------------------------------------------- |
| `metadata` | (required) | Output metadata of docker/build-push-action |

### Outputs

| Name        | Description |
| ----------- | ----------- |
| `image-uri` | Image URI   |
