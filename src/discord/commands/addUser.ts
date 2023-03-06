import * as fs from "fs";
import { FileCheck } from "./../../../types/command";
import { CheckForFile } from "./utils";

export async function AddUser(dataUser: any) {
  if ((await CheckForFile("./data/discord.json")) === FileCheck.NOT_FOUND) {
    fs.writeFile("./data/discord.json", dataUser, function (err) {});
  }
}
