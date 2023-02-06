import { VoiceConnectionStatus, entersState } from "@discordjs/voice";
import { GatewayIntentBits } from "discord-api-types/v10";
import { Client, Message, VoiceState } from "discord.js";
import dotenv from "dotenv";
import express from "express";
import { CommandAction, TextCommand } from "./../types/command";
import { CommandHandling } from "./discord";
import { BotConnection } from "./discord/connection";
import { createListeningStream } from "./discord/recording";
import transcriptTest from "./transcript/speech-to-text";

dotenv.config();

const app = express();

export function init(newAudio: any) {
  // let bufferArray: Buffer[] = [];
  // let buffer: Buffer | null = null;
  // newAudio.push(buffer);

  // buffer !== null && bufferArray.push(buffer);

  transcriptTest(newAudio);
}
const url: string | undefined = process.env.JUBILANT_URL;
const token: string | undefined = process.env.TOKEN;

if (!url && !token) {
  throw new Error("Brooky");
}

GatewayIntentBits;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.login(token);

// ClientEvents commands
client.on("messageCreate", (message: Message) => {
  try {
    if (typeof process.env.PREFIX !== "string") return;
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX as string)) return;

    const commandBody: any = message.content
      //@ts-ignore
      .slice(process.env.PREFIX.length)
      .split(" ");
    commandBody.includes("") && commandBody.splice(commandBody.indexOf(""), 1);

    let commandText: TextCommand["name"] = Object.values(
      CommandAction
    )?.includes(commandBody[0])
      ? commandBody[0]
      : message.reply(`Something went wrong with the command!`);

    let arg: string[] = commandBody.splice(0, 1);

    CommandHandling(commandText, arg);
  } catch {
    message.reply(`Something is wrong!`);
  }
});

let currentBotState = false;

// ClientEvents user join
client.on(
  "voiceStateUpdate",
  async (oldState: VoiceState, newState: VoiceState) => {
    console.log(JSON.stringify(newState, null, 4));

    console.log("Channel:", JSON.stringify(newState.channel, null, 4));

    const newChannel = newState.channel;

    if (
      newChannel !== null &&
      currentBotState == false &&
      newState?.member?.user.id == "117471687045414917"
    ) {
      const newConnection = BotConnection(newChannel);
      currentBotState = true;

      try {
        await entersState(newConnection, VoiceConnectionStatus.Ready, 20e3);
        const receiver = newConnection.receiver;

        receiver.speaking.on("start", (userId) => {
          createListeningStream(
            receiver,
            userId,
            client.users.cache.get(userId)
          );
        });
      } catch (error) {
        console.warn(error);
      }
    }

    console.log("member:", JSON.stringify(newState.member, null, 4));

    try {
    } catch {}
  }
);

try {
  app.get("/", (req: any, res: any) => {
    res.send("Hello World!");
  });

  app.listen(process.env.PORT || 3000, () => {
    return console.log(`Express is listening at ${url}`);
  });
} catch (error: any) {
  console.error(error);
}
