import { getImageURI, parseMetadataJSON } from './metadata.js'

type Inputs = {
  metadata: string
}

type Outputs = {
  imageURI: string | undefined
}

// eslint-disable-next-line @typescript-eslint/require-await
export const run = async (inputs: Inputs): Promise<Outputs> => {
  const metadata = parseMetadataJSON(inputs.metadata)
  return {
    imageURI: getImageURI(metadata),
  }
}
