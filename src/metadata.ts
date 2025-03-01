import assert from 'assert'

// https://docs.docker.com/reference/cli/docker/buildx/build/#metadata-file
export type Metadata = {
  'containerimage.digest'?: string
  'image.name'?: string
}

function assertIsMetadata(o: unknown): asserts o is Metadata {
  assert(typeof o === 'object', 'metadata must be an object')
  assert(o !== null, 'metadata must not be null')
  if ('containerimage.digest' in o) {
    assert(typeof o['containerimage.digest'] === 'string', 'containerimage.digest must be a string')
  }
  if ('image.name' in o) {
    assert(typeof o['image.name'] === 'string', 'image.name must be a string')
  }
}

export const parseMetadataJSON = (metadataString: string): Metadata => {
  const metadata = JSON.parse(metadataString)
  assertIsMetadata(metadata)
  return metadata
}

export const getImageURI = (metadata: Metadata): string | undefined => {
  if (!metadata['containerimage.digest']) {
    return
  }
  if (!metadata['image.name']) {
    return
  }
  const firstImageName = metadata['image.name'].split(',')[0]
  return `${firstImageName}@${metadata['containerimage.digest']}`
}
