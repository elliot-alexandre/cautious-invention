import type { VoiceConnection } from "@discordjs/voice";
import {
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
} from "@discordjs/voice";
import { EventActionType } from "./../../types/user";

import path from "path";
import type { InputWord } from "types/user";

export function TextRecognition(
  Transcript: string,
  UserId: string,
  channelGuildId: string
) {
  const pathData = path.join(
    //@ts-ignore
    process.env.PWD,
    "./public/discord.json"
  );

  // const data = JSON.parse(
  //   fs.readFileSync(pathData, { encoding: "utf8", flag: "r" })
  // );
  // const triggers = Object.fromEntries(data)[UserId].words;

  const triggers = [
    {
      value: "skill issue",
      action: EventActionType.PLAY,
      options: "dino.mp3",
    },
  ];

  for (let index = 0; index < triggers.length; index++) {
    const triggerWord = triggers[index].value;
    if (Transcript.includes(triggerWord)) {
      TriggerAction(UserId, triggers[index], channelGuildId);
    }
  }
}

function TriggerAction(
  UserId: string,
  word: InputWord,
  channelGuildId: string
) {
  const pathAudio = path.join(
    //@ts-ignore
    process.env.PWD,
    "./public/audio/dino.mp3"
  );

  const connection: VoiceConnection | undefined =
    getVoiceConnection(channelGuildId);

  const player = createAudioPlayer();

  const resource = createAudioResource(pathAudio);

  if (connection) {
    connection.subscribe(player);
  }
  return player.play(resource);
}
