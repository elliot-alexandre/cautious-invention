export type TextCommand = {
  name: CommandAction;
  type: CommandType;
};

export enum CommandAction {
  ADD_USER = "ADD_USER",
  ADD_WORD = "ADD_WORD",
  ADD_AUDIO = "ADD_AUDIO",
  HELP = "HELP",
  DELETE_USER = "DELETE_USER",
  LIST_USER = "LIST_USER",
  LIST_AUDIO = "LIST_AUDIO",
  DELETE_AUDIO = "DELETE_AUDIO",
}
export type CommandType = "Action" | "Read";

export enum FileCheck {
  NOT_FOUND = "NOT_FOUND",
  FILE_EXIST = "FILE_EXIST",
}
