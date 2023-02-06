import { joinVoiceChannel } from "@discordjs/voice";
import { InternalDiscordGatewayAdapterCreator } from "discord.js";

export const BotConnection = (newChannel: any) => {
  return joinVoiceChannel({
    channelId: newChannel?.id as string,
    guildId: newChannel?.guildId as string,
    selfDeaf: false,
    adapterCreator: newChannel?.guild
      .voiceAdapterCreator as InternalDiscordGatewayAdapterCreator,
  });
};
