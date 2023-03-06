import { Message } from "discord.js";
import { CommandAction } from "../../../types/command";
import { CurrentUsersArray } from "./../../index";

export function CommandHandling(
  command: CommandAction,
  argument: string[],
  message: Message
) {
  switch (command) {
    case CommandAction.ADD_USER: {
      let userId = argument[0];
      const listWords = new Set();

      console.log(CurrentUsersArray);
      argument.map((element: string, index: number) => {
        element.toLowerCase().match(/[^a-z]/g) ? null : listWords.add(element);
      });

      console.log(listWords);
      //@ts-ignore
      const regex = /[^0-9]/g;
      console.log(userId.replaceAll(regex, ""));

      break;
    }
    case CommandAction.DELETE_USER: {
      break;
    }
    case CommandAction.EDIT_USER: {
      break;
    }
    default:
      break;
  }
}
