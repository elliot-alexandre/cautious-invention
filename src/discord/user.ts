import { User } from "discord.js";
import * as fs from "fs";
import path from "path";
import { InputWord, Users } from "types/user";
import { FileCheck } from "../../types/command";
import { client, listUsersObserved } from "./../index";
import { CheckForFile } from "./utils";

/**
 * @function InitListUser
 * @description Create a current list of userId that are being tracked
 */
export async function InitListUser(): Promise<void> {
  const pathData = path.join(
    //@ts-ignore
    process.env.PWD,
    "./public/discord.json"
  );
  if ((await CheckForFile(pathData)) === FileCheck.FILE_EXIST) {
    const data = fs.readFileSync(pathData, { encoding: "utf8", flag: "r" });

    const listUser = new Set(Object.keys(JSON.parse(data)));

    /**
     * @Insert Observed userId in the list
     */
    listUser.forEach((value) => listUsersObserved.add(value));
  } else if ((await CheckForFile(pathData)) === FileCheck.NOT_FOUND) {
    fs.appendFileSync(pathData, JSON.stringify([], null, 2));
  }
}

/**
 * @function GetMapUser
 * @description return a map of the words related to the user.
 */

export function GetMapUser(id: string) {
  const pathUserData = path.join(
    //@ts-ignore
    process.env.PWD,
    "./public/discord.json"
  );

  const data: [[Users]] = JSON.parse(
    fs.readFileSync(pathUserData, { encoding: "utf8", flag: "r" })
  );

  if (data !== undefined) {
    const listOfWord = Object.fromEntries(data)[id].words.map(
      (item: InputWord) => item.value
    );
    return listOfWord;
  } else {
    return [];
  }
}

export async function GetUserById(id: string): Promise<User> {
  let trimId = id.replace(/[^0-9.]+/g, "");
  return client.users.fetch(trimId);
}
