# docker-build-metadata-action [![ts](https://github.com/int128/docker-build-metadata-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/docker-build-metadata-action/actions/workflows/ts.yaml)

This action parses the outputs of https://github.com/docker/metadata-action and https://github.com/docker/build-push-action.

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
          tags: ${{ steps.metadata.outputs.tags }}
          digest: ${{ steps.build.outputs.digest }}
```

This action returns the image URI as an output.
The image URI is constructed by concatenating the first tag and the digest with `@` as a separator.
For example, if the first tag is `ghcr.io/owner/repo:tag` and the digest is `sha256:abc123`, the image URI will be `ghcr.io/owner/repo:tag@sha256:abc123`.

## Specification

This action assumes the following inputs:

- `tags` is the image tags in multiline string format.
- `digest` is the image digest in string format.

If `tags` contains multiple tags, the first tag is used to construct the image URI.
The image URI is constructed by concatenating the first tag and the digest with `@` as a separator.

### Inputs

| Name     | Default    | Description                                 |
| -------- | ---------- | ------------------------------------------- |
| `tags`   | (required) | Tags output from docker/metadata-action     |
| `digest` | (optional) | Digest output from docker/build-push-action |

### Outputs

| Name        | Description |
| ----------- | ----------- |
| `image-uri` | Image URI   |
