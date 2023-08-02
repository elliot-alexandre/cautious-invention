export enum EventActionType {
  WEBHOOK = "WEBHOOK", // @TODO not supported yet.
  PLAY = "PLAY",
  MUET = "MUET",
  KICK = "KICK",
}

/**
 * @elliot-alexandre
 * Types created for the storage of users information in the public/discord.json file.
 */

export type Users = {
  [key: string]: UserData;
};

export type UserData = {
  id: string;
  username: string;
  words?: InputWord[];
};

export type InputWord = {
  value: string;
  action: EventActionType;
  options?: string;
};
