import {
  VoiceConnection,
  VoiceConnectionStatus,
  entersState,
} from "@discordjs/voice";
import { CreateListeningStream } from "../recording";

export async function TrackingVoice(
  shardVoiceConnection: VoiceConnection,
  userId2: string
) {
  try {
    try {
      await entersState(
        shardVoiceConnection,
        VoiceConnectionStatus.Ready,
        20_000
      );
    } catch {
      if (
        shardVoiceConnection.state.status !== VoiceConnectionStatus.Destroyed
      ) {
        try {
          shardVoiceConnection.destroy();
        } catch {}
      }
    }

    const receiver = shardVoiceConnection.receiver;
    // console.log(test);
    /**
     * @todo
     *
     * changing the userId to be for each user in the listen list instead of everyone.
     */

    receiver.speaking.on("start", async (userId) => {
      console.log("Fire!");

      if (userId === userId2) {
        return CreateListeningStream(receiver, userId2, shardVoiceConnection);
      }
    });
  } catch (error) {
    console.warn(error);
  }
}
