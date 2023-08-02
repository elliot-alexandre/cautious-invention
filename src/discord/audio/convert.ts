export async function convertAudio(input: any) {
  try {
    // stereo to mono channel
    let data = new Int16Array(input);
    let ndata = data.filter((el, idx) => idx % 2);
    return Buffer.from(ndata);
  } catch (e) {
    console.log(e);
    console.log("convertAudio: " + e);
    throw e;
  }
}
