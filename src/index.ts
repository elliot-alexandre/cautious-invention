import { GatewayIntentBits } from "discord-api-types/v10";
import { Client, Events, Message, VoiceState } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import { CommandAction, TextCommand } from "./../types/command";
import { CommandHandling } from "./discord/commands";
import { Reply } from "./discord/commands/replyMessage";
import { ShardAction, ShardHandler } from "./discord/shard";
import { InitListUser } from "./discord/user";

dotenv.config();

const url: string | undefined = process.env.JUBILANT_URL;
const token: string | undefined = process.env.TOKEN;
/**
 * @constant Global string for prefix of any commands
 */
export const Prefix: string = process.env.PREFIX ?? "!!";

/**
 * @constant Global variable of users Tracked
 */
export const listUsersObserved: Set<string> = new Set();
/**
 * @constant Global variable of users Active
 */
export const listUsersActive: Set<string> = new Set();
/**
 * UserId and ChannelId
 */
export const listUserByChannel: Map<string, string> = new Map();

const modelDirectory = path.join(
  //@ts-ignore
  process.env.PWD,
  "./models/vosk-model-small-en-us-0.15"
);
const { loadModel } = require("@solyarisoftware/voskjs");

export const model = loadModel(modelDirectory);

if (!url && !token) {
  throw new Error("Brooky");
}
InitListUser();

GatewayIntentBits;
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// ClientEvents commands
client.on(Events.MessageCreate, (message: Message) => {
  try {
    if (typeof Prefix !== "string") return;
    if (message.author.bot) return;
    if (!message.content.startsWith(Prefix as string)) return;

    const commandBody: any = message.content
      //@ts-ignore
      .slice(Prefix.length)
      .split(" ");
    commandBody.includes("") && commandBody.splice(commandBody.indexOf(""), 1);

    const commandText: TextCommand["name"] = Object.values(
      CommandAction
    )?.includes(commandBody[0])
      ? commandBody[0]
      : message.reply(Reply(Prefix).messageError.commandTypo);

    commandBody.splice(0, 1);
    const arg: string[] = commandBody;
    CommandHandling(commandText, arg, message);
  } catch (e) {
    console.log(e);
    message.reply(Reply(Prefix).messageError.default);
  }
});

let currentBotState = false;

// ClientEvents user join
client.on(
  Events.VoiceStateUpdate,
  async (oldState: VoiceState, newState: VoiceState) => {
    let newChannel = newState.channel;

    if (
      newChannel !== null &&
      newState?.member?.user.id == "117471687045414917"
    ) {
      ShardHandler(ShardAction.JOIN, newChannel, "117471687045414917");
    }
  }
);

client.on(Events.Error, console.warn);

/**
 * Connect the discord client with the current token
 */
void client.login(token);
