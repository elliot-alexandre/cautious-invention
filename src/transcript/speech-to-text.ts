const {
  logLevel,
  loadModel,
  transcriptFromBuffer,
  freeModel,
} = require("@solyarisoftware/voskjs");

import * as path from "path";

async function transcriptTest(buffer: Buffer) {
  const modelDirectory = path.join(
    //@ts-ignore
    process.env.PWD,
    "./models/vosk-model-small-en-us-0.15"
  );

  console.log(`model directory      : ${modelDirectory}`);

  // set the vosk log level to silence
  logLevel(-1);

  // load in memory a Vosk directory model
  const model = loadModel(modelDirectory);

  try {
    const result = await transcriptFromBuffer(buffer, model);

    console.log(`transcript: ${JSON.stringify(result, null, 4)}`);

    return result;
  } catch (error) {
    console.error(error);
  }

  // free the Vosk runtime model
  freeModel(model);
}

export default transcriptTest;
