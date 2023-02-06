import { OpusEncoder } from "@discordjs/opus";
import { EndBehaviorType, VoiceReceiver } from "@discordjs/voice";
import type { User } from "discord.js";
import transcriptTest from "../transcript/speech-to-text";

export async function createListeningStream(
  receiver: VoiceReceiver,
  userId: string,
  user?: User
) {
  let buffer: any = [];
  const opusEncoder = new OpusEncoder(16000, 2);

  const opusStream = receiver.subscribe(userId, {
    end: {
      behavior: EndBehaviorType.AfterSilence,
      duration: 1000,
    },
  });

  opusStream.on("data", (data) => {
    buffer.push(opusEncoder.decode(data));
  });

  opusStream.on("end", async () => {
    buffer = Buffer.concat(buffer);
    const duration = buffer.length / 16000 / 4;
    console.log("duration:", duration + "ms");

    if (duration < 1 || duration > 19) {
      console.log("TOO SHORT / TOO LONG; SKPPING");
      return;
    }
    try {
      let new_buffer = await convertAudio(buffer);
      let out = await transcriptTest(new_buffer);
      if (out != null) {
        console.log("result:" + out.text);
      } else if (typeof out.text !== "string") {
        console.log("error", out);
      }
    } catch (e) {
      console.log("tmpraw rename: " + e);
    }
  });

  async function convertAudio(input: any) {
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
}
