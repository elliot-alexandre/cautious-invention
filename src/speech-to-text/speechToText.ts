import { model } from "./../index";
const {
  logLevel,
  transcriptFromBuffer,
  freeModel,
} = require("@solyarisoftware/voskjs");

export async function Transcript(buffer: Buffer) {
  /**
   *  @summary set the vosk log level to silence
   */
  logLevel(-1);

  try {
    const result = await transcriptFromBuffer(buffer, model);
    return result;
  } catch (error) {
    console.error(error);
  }
}
