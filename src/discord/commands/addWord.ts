import type { Message } from "discord.js";
import * as fs from "fs";
import path from "path";
import { GetItemsDir } from "../utils";
import { EventActionType, InputWord, UserData } from "./../../../types/user";
import { Prefix } from "./../../index";
import { Reply } from "./replyMessage";
export async function AddWordInterraction(
  argument: string[],
  message: Message
) {
  const pathData = path.join(
    //@ts-ignore
    process.env.PWD,
    "./public/discord.json"
  );

  const userId = argument[0].replace(/[^0-9.]+/g, "");

  const newArgument = [...argument];
  const dataArgument: string[] = newArgument.slice(1).join(" ").split(";");
  const word: string = dataArgument[0].trim();
  const actionType: EventActionType | string = dataArgument[1]
    .trim()
    .toUpperCase();
  const optionsArgument: string | undefined = dataArgument[2]?.trim();

  const pathAudio: string = path.join(
    //@ts-ignore
    process.env.PWD,
    `./public/audio/`
  );
  const listAudioFiles = new Set(GetItemsDir(pathAudio));

  try {
    const data = JSON.parse(
      fs.readFileSync(pathData, { encoding: "utf8", flag: "r" })
    );
    if (Object.fromEntries(data)[userId] === undefined) {
      message.reply(Reply(Prefix).messageError.notCreated);
      return;
    }
    const userData: UserData = Object.fromEntries(data)[userId];
    if (userData.words?.find((item: InputWord) => item.value === word)) {
      message.reply(Reply(Prefix).messageReplyWord.wordAlreadyCreated);
      let filter = (m: any) => m.author.id === message.author.id;
      message.channel
        .awaitMessages({
          filter,
          time: 30000,
          max: 1,
        })
        .then((collected: any) => {
          const iterator = collected.values();
          const mapMessage = iterator.next().value;

          const messageReceived: string = mapMessage.content;

          message.channel.send("test");
        });
    }
    /**
     * @summary Asking for a word or sentence to input as trigger.
     */
    let payload: any = {
      value: word,
    };

    switch (actionType) {
      case EventActionType.KICK:
        payload.action = EventActionType.KICK;
        break;
      case EventActionType.MUET:
        if (Number.isNaN(optionsArgument)) {
          return message.channel.send(Reply(Prefix).messageError.commandTypo);
        }

        payload.action = EventActionType.MUET;
        payload.options = parseInt(optionsArgument);

        break;
      case EventActionType.PLAY:
        if (!listAudioFiles.has(optionsArgument)) {
          return message.channel.send(Reply(Prefix).messageError.commandTypo);
        }
        payload.action = EventActionType.PLAY;
        payload.options = optionsArgument;

        break;
      case EventActionType.WEBHOOK:
        /**
         * @Todo
         */
        if (typeof optionsArgument !== "string") {
          return message.channel.send(Reply(Prefix).messageError.commandTypo);
        }
        payload.action = EventActionType.WEBHOOK;
        payload.options = optionsArgument;
        break;
      default:
        message.channel.send(Reply(Prefix).messageError.commandTypo);
        break;
    }

    AddUserData(userId, payload as InputWord);
    message.channel.send(Reply(Prefix).messageReplyWord.wordAdded);
  } catch (error) {
    console.warn(error);
  }
}

function AddUserData(userId: UserData["id"], word: InputWord) {
  const pathData = path.join(
    //@ts-ignore
    process.env.PWD,
    "./public/discord.json"
  );

  let data = JSON.parse(
    fs.readFileSync(pathData, { encoding: "utf8", flag: "r" })
  );

  Object.fromEntries(data)[userId].words.push(word);

  fs.writeFileSync(pathData, JSON.stringify(data, null, 2));
}
