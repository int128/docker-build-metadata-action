import { describe, expect, it } from 'vitest'
import { getImageURI } from '../src/metadata.js'

describe('getImageURI', () => {
  it('returns the image URI', () => {
    const digest = 'sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98'
    const tags = ['ghcr.io/int128/kubebuilder-updates:main']
    const imageURI = getImageURI(tags, digest)
    expect(imageURI).toBe(
      'ghcr.io/int128/kubebuilder-updates:main@sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98',
    )
  })

  it('returns the first image URI if multiple tags are provided', () => {
    const digest = 'sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98'
    const tags = ['ghcr.io/int128/kubebuilder-updates:v1.0.0', 'ghcr.io/int128/kubebuilder-updates:latest']
    const imageURI = getImageURI(tags, digest)
    expect(imageURI).toBe(
      'ghcr.io/int128/kubebuilder-updates:v1.0.0@sha256:550ca2b897799d1ba9f799ca535bde988cd1427d039b34d583eba24ce5fc6c98',
    )
  })

  it('returns undefined if the digest is empty', () => {
    const digest = ''
    const tags = ['ghcr.io/int128/kubebuilder-updates:main']
    const imageURI = getImageURI(tags, digest)
    expect(imageURI).toBeUndefined()
  })
})
