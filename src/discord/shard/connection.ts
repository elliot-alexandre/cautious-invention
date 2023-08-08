import type { VoiceConnection } from "@discordjs/voice";
import { joinVoiceChannel } from "@discordjs/voice";
import type { VoiceBasedChannel } from "discord.js";
import { TrackingVoice } from "./track";

export async function ShardJoin(channel: VoiceBasedChannel, userId: string) {
  console.log("Boom");

  const shardVoiceConnection: VoiceConnection = joinVoiceChannel({
    channelId: channel?.id,
    guildId: channel?.guildId,
    selfDeaf: false,
    /* @ts-ignore */
    adapterCreator: channel?.guild.voiceAdapterCreator,
    debug: true,
  });

  console.log(__dirname + "/track.ts");

  TrackingVoice(userId, channel);
}
