import { GatewayIntentBits } from "discord-api-types/v10";
import { Client, Events, Message, VoiceState } from "discord.js";
import dotenv from "dotenv";
import { CommandAction, TextCommand } from "./../types/command";
import { CommandHandling } from "./discord/commands";
import { ShardAction, ShardHandler } from "./discord/shard";

dotenv.config();

const url: string | undefined = process.env.JUBILANT_URL;
const token: string | undefined = process.env.TOKEN;

if (!url && !token) {
  throw new Error("Brooky");
}

GatewayIntentBits;
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

export let CurrentUsersArray: string[] = [];

// ClientEvents commands
client.on(Events.MessageCreate, (message: Message) => {
  try {
    if (typeof process.env.PREFIX !== "string") return;
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX as string)) return;

    const commandBody: any = message.content
      //@ts-ignore
      .slice(process.env.PREFIX.length)
      .split(" ");
    commandBody.includes("") && commandBody.splice(commandBody.indexOf(""), 1);

    CurrentUsersArray.push("117471687045414917");

    const commandText: TextCommand["name"] = Object.values(
      CommandAction
    )?.includes(commandBody[0])
      ? commandBody[0]
      : message.reply(`Something went wrong with the command!`);

    commandBody.splice(0, 1);
    const arg: string[] = commandBody;
    console.log(arg);
    CommandHandling(commandText, arg, message);
  } catch (e) {
    console.log(e);
    message.reply(`Something is wrong!`);
  }
});

let currentBotState = false;

// ClientEvents user join
client.on(
  Events.VoiceStateUpdate,
  async (oldState: VoiceState, newState: VoiceState) => {
    // console.log("old:", JSON.stringify(oldState.channel?.members, null, 2));
    // console.log("new:", JSON.stringify(newState.channel?.members, null, 2));

    const newChannel = newState.channel;

    if (
      newChannel !== null &&
      currentBotState == false &&
      newState?.member?.user.id == "117471687045414917"
    ) {
      void ShardHandler(ShardAction.JOIN, newChannel);
    }
  }
);

// client.on(Events.InteractionCreate, async (interaction: Interaction) => {
//   console.log(JSON.stringify(interaction, null, 2));
// });

client.on(Events.Error, console.warn);

/**
 * Connect the discord client with the current token
 */
void client.login(token);
