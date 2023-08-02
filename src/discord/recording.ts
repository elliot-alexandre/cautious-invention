import { OpusEncoder } from "@discordjs/opus";
import {
  EndBehaviorType,
  VoiceConnection,
  VoiceReceiver,
} from "@discordjs/voice";
import { Transcript } from "../speech-to-text/speechToText";
import { TextRecognition } from "../speech-to-text/textRecognition";
import { convertAudio } from "./audio/convert";

export async function CreateListeningStream(
  receiver: VoiceReceiver,
  userId: string,
  shardVoiceConnection: VoiceConnection
) {
  try {
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
        return;
      }
      const new_buffer = await convertAudio(buffer);
      const out = await Transcript(new_buffer);
      if (out != null) {
        console.log("result: " + out.text);
        TextRecognition(out.text, userId, shardVoiceConnection);
        return;
      } else if (typeof out.text !== "string") {
        console.log("error", out);
      }
    });
  } catch (e) {
    console.warn(e);
  }
}
