import type { Message } from "discord.js";
import { CommandAction } from "../../../types/command";
import { AddAudioInterraction } from "./addAudio";
import { AddUserInterraction } from "./addUser";
import { AddWordInterraction } from "./addWord";

export function CommandHandling(
  command: CommandAction,
  argument: string[],
  message: Message
) {
  switch (command) {
    case CommandAction.ADD_USER: {
      const userId = argument[0];
      AddUserInterraction(userId, message);
      break;
    }
    case CommandAction.ADD_WORD: {
      AddWordInterraction(argument, message);
      break;
    }
    case CommandAction.DELETE_USER: {
      break;
    }
    case CommandAction.ADD_AUDIO: {
      const audioName: string = argument[0];
      AddAudioInterraction(audioName, message);
      break;
    }
    case CommandAction.LIST_AUDIO: {
      break;
    }
    case CommandAction.DELETE_AUDIO: {
      break;
    }
    default:
      break;
  }
}
