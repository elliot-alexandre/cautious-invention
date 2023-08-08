export function convertAudio(input: any) {
  try {
    // stereo to mono channel
    const data = new Int16Array(input);
    const ndata = data.filter((el, idx) => idx % 2);
    const bufferMono = Buffer.from(ndata);
    return bufferMono;
  } catch (e) {
    console.log(e);
    console.log("convertAudio: " + e);
    throw e;
  }
}
