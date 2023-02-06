import { EndBehaviorType, VoiceReceiver } from "@discordjs/voice";
import type { User } from "discord.js";
import { opus } from "prism-media";
import { Decoder } from "prism-media/dist/opus";
import { OpusEncoderOptions } from "prism-media/dist/opus/adapters/OpusEncoder";
import { init } from "../index";

export async function createListeningStream(
  receiver: VoiceReceiver,
  userId: string,
  user?: User
) {
  const opusStream = receiver.subscribe(userId, {
    end: {
      behavior: EndBehaviorType.AfterSilence,
      duration: 1000,
    },
  });
  let transcriptBuffer: any = [];
  let buffer: any = [];

  const options: OpusEncoderOptions = {
    rate: 48000,
    channels: 1,
    frameSize: 2,
  };

  const encoder = new opus.Encoder(options);
  const decoder = new opus.Decoder(options);
  opusStream.on("data", (data) => {
    buffer.push(data);
  });

  encoder.
  async function convert_audio(input: any) {
    try {
      // stereo to mono channel
      const data = new Int16Array(input);
      const ndata = data.filter((el, idx) => idx % 2);
      return Buffer.from(ndata);
    } catch (e) {
      console.log(e);
      console.log("convert_audio: " + e);
      throw e;
    }
  }

  opusStream.on("end", async () => {
    let buffer1 = Buffer.concat(buffer);
    const duration = buffer1.length / 48000 / 4;
    console.log("duration: " + duration);
    if (duration < 1.0) {
      buffer = Buffer.concat(buffer);
      let pcm_buffer = Decoder(buffer);
      console.log("pcm_buffer", pcm_buffer);
      let mono_pcm_buffer = convert_audio(pcm_buffer);
      transcriptBuffer.push(await mono_pcm_buffer);
    }
  });
  console.log(JSON.stringify(transcriptBuffer, null, 4));

  console.log(buffer);
  init(buffer);
}
