export const Reply = (prefix: string | undefined) => {
  return {
    messageError: {
      commandTypo: "Something went wrong with the command!",
      default: "Something is wrong!",
      audioFileAlreadyExist: "This audio file already exist.",
      audioFileWrongFormat:
        "This audio file is in the wrong format only mp3 and wav are accepted.",
      notCreated: `You need to add the user first. Please refer yourself to the list of command by using the command ${
        prefix ?? "!!"
      }HELP.`,
    },
    messageAdd: {
      inputAudio: `Send in your audio file in the chat.`,
      fileDownloaded: `The audio file is now available.`,
      userCreated: `User has been created !`,

      alreadyCreated: `This user is already created, if you want to edit/delete the user, please refer yourself to the list of command by using the command ${
        prefix ?? "!!"
      }HELP.`,
      requestInput: `Type the word or group of words and with the action trigger. (e.g: hello world; MUET; 10; )`,
    },
    messageDeleteUser: {},
    MessageEditUser: {},
    messageReplyWord: {
      wordAdded: `The word is now assigned to the user.`,
      wordAlreadyCreated: `The word is already assigned to the user, Do you want to overwrite this entry ?`,
    },
    messageReplySentence: {},
  };
};
