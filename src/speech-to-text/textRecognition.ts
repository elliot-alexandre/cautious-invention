import {
  VoiceConnection,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
import * as fs from "fs";

import path from "path";
import { InputWord } from "types/user";

export function TextRecognition(
  Transcript: string,
  UserId: string,
  shardVoiceConnection: VoiceConnection
) {
  const pathData = path.join(
    //@ts-ignore
    process.env.PWD,
    "./public/discord.json"
  );

  let data = JSON.parse(
    fs.readFileSync(pathData, { encoding: "utf8", flag: "r" })
  );
  const triggers = Object.fromEntries(data)[UserId].words;

  console.log(triggers.length);

  for (let index = 0; index < triggers.length; index++) {
    const triggerWord = triggers[index].value;
    console.log(triggerWord);
    if (Transcript.includes(triggerWord)) {
      TriggerAction(UserId, triggers[index], shardVoiceConnection);
    }
  }
  return;
}

function TriggerAction(
  UserId: string,
  word: InputWord,
  shardVoiceConnection: VoiceConnection
) {
  console.log("test2");
  const pathAudio = path.join(
    //@ts-ignore
    process.env.PWD,
    "./public/audio/dino.mp3"
  );

  const player = createAudioPlayer();

  const resource = createAudioResource(pathAudio);

  shardVoiceConnection.subscribe(player);

  player.play(resource);
}
