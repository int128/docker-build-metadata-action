import { describe, expect, it } from 'vitest'
import { getImageURI, Metadata, parseMetadataJSON } from '../src/metadata.js'

describe('parseMetadataJSON', () => {
  it('parses the metadata', () => {
    const metadataString = `{
  "containerimage.digest": "sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98",
  "image.name": "ghcr.io/int128/kubebuilder-updates:main"
}`
    const metadata = parseMetadataJSON(metadataString)
    expect(metadata).toStrictEqual({
      'containerimage.digest': 'sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98',
      'image.name': 'ghcr.io/int128/kubebuilder-updates:main',
    })
  })

  it('returns an empty object if the metadata is empty', () => {
    const metadataString = '{}'
    const metadata = parseMetadataJSON(metadataString)
    expect(metadata).toStrictEqual({})
  })

  it('throws an error if the metadata is invalid', () => {
    const metadataString = `{
  "containerimage.digest": "sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98",
  "image.name": 42
}`
    expect(() => parseMetadataJSON(metadataString)).toThrow('image.name must be a string')
  })
})

describe('getImageURI', () => {
  it('returns the image URI', () => {
    const metadata: Metadata = {
      'containerimage.digest': 'sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98',
      'image.name': 'ghcr.io/int128/kubebuilder-updates:main',
    }
    const imageURI = getImageURI(metadata)
    expect(imageURI).toBe(
      'ghcr.io/int128/kubebuilder-updates:main@sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98',
    )
  })

  it('returns the first image URI if image.name has multiple images', () => {
    const metadata: Metadata = {
      'containerimage.digest': 'sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98',
      'image.name': 'ghcr.io/int128/kubebuilder-updates:v1.0.0,ghcr.io/int128/kubebuilder-updates:latest',
    }
    const imageURI = getImageURI(metadata)
    expect(imageURI).toBe(
      'ghcr.io/int128/kubebuilder-updates:v1.0.0@sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98',
    )
  })

  it('returns undefined if the metadata is empty', () => {
    const metadata: Metadata = {}
    const imageURI = getImageURI(metadata)
    expect(imageURI).toBeUndefined()
  })
})
