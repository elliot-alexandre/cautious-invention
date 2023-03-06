import {
  VoiceConnection,
  VoiceConnectionStatus,
  entersState,
} from "@discordjs/voice";
import { createListeningStream } from "../recording";
import { client } from "./../../index";

export async function TrackingVoice(shardVoiceConnection: VoiceConnection) {
  try {
    await entersState(shardVoiceConnection, VoiceConnectionStatus.Ready, 20e3);
    const receiver = shardVoiceConnection.receiver;

    /**
     * @todo
     *
     * changing the userId to be for each user in the listen list instead of everyone.
     */

    receiver.speaking.on("start", (userId) => {
      createListeningStream(receiver, userId, client.users.cache.get(userId));
    });
  } catch (error) {
    console.warn(error);
  }
}
