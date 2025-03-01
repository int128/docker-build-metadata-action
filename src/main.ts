import * as core from '@actions/core'
import { run } from './run.js'

const main = async (): Promise<void> => {
  const outputs = await run({
    metadata: core.getInput('metadata', { required: true }),
  })
  core.info(`Setting the outputs: ${JSON.stringify(outputs)}`)
  if (outputs.imageURI) {
    core.setOutput('image-uri', outputs.imageURI)
  }
}

main().catch((e: Error) => {
  core.setFailed(e)
  console.error(e)
})
