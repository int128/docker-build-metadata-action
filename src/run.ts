import { getImageURI } from './metadata.js'

type Inputs = {
  tags: string[]
  digest: string
}

type Outputs = {
  imageURI: string | undefined
}

export const run = async (inputs: Inputs): Promise<Outputs> => {
  return {
    imageURI: getImageURI(
      inputs.tags.map((tag) => tag.trim()).filter((tag) => tag.length > 0 && !tag.startsWith('#')),
      inputs.digest,
    ),
  }
}
