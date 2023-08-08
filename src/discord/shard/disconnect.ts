import { getVoiceConnection } from "@discordjs/voice";
import type { VoiceBasedChannel } from "discord.js";

export async function ShardDisconnect(channel: VoiceBasedChannel) {
  const connection = getVoiceConnection(channel.guildId);
  if (connection !== undefined) {
    connection.destroy();
  } else {
    console.warn("Error : connection is undefined");
  }
}
