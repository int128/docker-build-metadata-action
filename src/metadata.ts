export const getImageURI = (tags: string[], digest: string): string | undefined => {
  if (!digest) {
    return
  }
  const firstImageTag = tags[0]
  return `${firstImageTag}@${digest}`
}
