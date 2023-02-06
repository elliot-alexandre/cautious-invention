export type TextCommand = {
  name: CommandAction;
  type: CommandType;
};

export enum CommandAction {
  ADD_USER = "ADD_USER",
  DELETE_USER = "DELETE_USER",
}
export type CommandType = "Action" | "Read";
