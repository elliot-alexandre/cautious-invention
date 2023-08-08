import type { VoiceConnection } from "@discordjs/voice";
import {
  VoiceConnectionStatus,
  entersState,
  getVoiceConnection,
} from "@discordjs/voice";
import type { VoiceBasedChannel } from "discord.js";
import { CreateListeningStream } from "../recording";

const { Worker, isMainThread, parentPort } = require("worker_threads");

export async function TrackingVoice(
  userId2: string,
  channel: VoiceBasedChannel
) {
  try {
    const connection: VoiceConnection | undefined = getVoiceConnection(
      channel.guildId
    );

    const receiver = connection?.receiver;
    if (connection !== undefined) {
      receiver?.speaking.on("start", async (userId) => {
        console.log("Fire!");
        await entersState(
          connection as VoiceConnection,
          VoiceConnectionStatus.Ready,
          20_000
        );
        if (userId === userId2) {
          CreateListeningStream(receiver, userId2, channel.guildId);
        }
      });
    }
  } catch (error) {
    console.warn(error);
  }
}
