import { VoiceBasedChannel } from "discord.js";
import { ShardJoin } from "./connection";

export enum ShardAction {
  JOIN = "join",
  DISCONNECT = "disconnect",
}

export const ShardHandler = (
  action: ShardAction,
  channel: VoiceBasedChannel | undefined
) => {
  if (action === ShardAction.JOIN && channel !== undefined) {
    return ShardJoin(channel);
  } else if (action === ShardAction.DISCONNECT) {
    return null;
  }
};
