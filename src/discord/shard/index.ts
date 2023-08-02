// import { VoiceBasedChannel } from "discord.js";
import { ShardJoin } from "./connection";
import { ShardDisconnect } from "./disconnect";

export enum ShardAction {
  JOIN = "join",
  DISCONNECT = "disconnect",
}

export function ShardHandler(
  action: ShardAction,
  channel: any | undefined,
  userId: string
) {
  if (action === ShardAction.JOIN && channel !== undefined) {
    ShardJoin(channel, userId);
  } else if (action === ShardAction.DISCONNECT) {
    ShardDisconnect(channel);
  }
}
