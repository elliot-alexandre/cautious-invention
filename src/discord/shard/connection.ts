import { VoiceConnection, joinVoiceChannel } from "@discordjs/voice";
import { VoiceBasedChannel } from "discord.js";
import { TrackingVoice } from "./track";

export async function ShardJoin(channel: VoiceBasedChannel) {
  const shardVoiceConnection: VoiceConnection = joinVoiceChannel({
    channelId: channel?.id,
    guildId: channel?.guildId,
    selfDeaf: false,
    adapterCreator: channel?.guild.voiceAdapterCreator,
  });

  TrackingVoice(shardVoiceConnection);
}
