import { getVoiceConnection } from "@discordjs/voice";
import { VoiceBasedChannel } from "discord.js";

export async function ShardDisconnect(channel: VoiceBasedChannel) {
  const connection = getVoiceConnection(channel.guild.id);
  if (connection !== undefined) {
    connection.destroy();
  } else {
    console.warn("Error : connection is undefined");
  }
}
