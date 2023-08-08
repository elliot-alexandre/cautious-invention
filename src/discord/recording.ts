import { OpusEncoder } from "@discordjs/opus";
import type { VoiceReceiver } from "@discordjs/voice";
import { EndBehaviorType } from "@discordjs/voice";
import { Transcript } from "../speech-to-text/speechToText";
import { TextRecognition } from "../speech-to-text/textRecognition";
import { convertAudio } from "./audio/convert";

const opusEncoder = new OpusEncoder(16000, 2);

export async function CreateListeningStream(
  receiver: VoiceReceiver,
  userId: string,
  channelGuildId: string
) {
  let buffer: any = [];

  const opusStream = receiver.subscribe(userId, {
    end: {
      behavior: EndBehaviorType.AfterSilence,
      duration: 1000,
    },
  });

  opusStream.on("data", (data) => {
    buffer.push(opusEncoder.decode(data));
  });

  opusStream.on("end", () => {
    buffer = Buffer.concat(buffer);
    const duration = buffer.length / 16000 / 4;

    console.log("duration:", duration + "ms");

    if (duration < 1 || duration > 19) {
      buffer.fill(0);
      buffer = null;
      return;
    } else {
      Transcript(convertAudio(buffer)).then((data) => {
        if (!data) {
          console.warn("data:" + data);
        }
        console.log("result: " + data.text);
        TextRecognition(data.text, userId, channelGuildId);
        buffer.fill(0);
        buffer = null;
      });
    }
  });
}
