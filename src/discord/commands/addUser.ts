import * as fs from "fs";
import path from "path";
import { GetUserById } from "../user";
import { Prefix } from "./../../index";
import { Reply } from "./replyMessage";

export async function AddUserInterraction(userId: string, message: any) {
  const pathData = path.join(
    //@ts-ignore
    process.env.PWD,
    "./public/discord.json"
  );

  let data = JSON.parse(
    fs.readFileSync(pathData, { encoding: "utf8", flag: "r" })
  );

  if (Object.fromEntries(data)[userId.replace(/[^0-9.]+/g, "")] !== undefined) {
    console.log(process.env.PREFIX);
    message.reply(Reply(Prefix).messageAdd.alreadyCreated);
    return null;
  }
  /**
   * @summary Asking for a word or sentence to input as trigger.
   */
  const discordUserData = await GetUserById(userId);

  /**
   * @TODO add error handling
   */
  const newUserData = [
    discordUserData.id,
    {
      id: discordUserData.id,
      username: discordUserData.username,
      words: [],
    },
  ];

  data.push(newUserData);
  fs.writeFileSync(pathData, JSON.stringify(data, null, 2));

  message.channel.send(Reply(Prefix).messageAdd.userCreated);
}
