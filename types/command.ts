export type TextCommand = {
  name: CommandAction;
  type: CommandType;
};

export enum CommandAction {
  ADD_USER = "ADD_USER",
  DELETE_USER = "DELETE_USER",
  EDIT_USER = "EDIT_USER",
}
export type CommandType = "Action" | "Read";

export enum FileCheck {
  NOT_FOUND = "NOT_FOUND",
  FILE_EXIST = "FILE_EXIST",
}
