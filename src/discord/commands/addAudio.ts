import type { Message } from "discord.js";
import * as fs from "fs";
import * as https from "https";
import path from "path";
import { GetItemsDir } from "../utils";
import { Prefix } from "./../../index";
import { Reply } from "./replyMessage";

export async function AddAudioInterraction(
  audioName: string,
  message: Message
) {
  try {
    const regex = new RegExp("^[a-zA-Z0-9_.-]*$");
    if (!regex.test(audioName))
      return message.reply(Reply(Prefix).messageError.commandTypo);

    const pathAudio: string = path.join(
      //@ts-ignore
      process.env.PWD,
      `./public/audio/`
    );
    const listAudioFiles = new Set(GetItemsDir(pathAudio));

    /**
     * @summary Only allowing two audio format for now.
     */
    if (
      listAudioFiles.has(`${audioName}.mp3`) ||
      listAudioFiles.has(`${audioName}.wav`)
    ) {
      message.reply(Reply(Prefix).messageError.audioFileAlreadyExist);
      return;
    }
    message.reply(Reply(Prefix).messageAdd.inputAudio);

    let filter = (m: any) => m.author.id === message.author.id;
    message.channel
      .awaitMessages({
        filter,
        max: 1,
      })
      .then((collected: any) => {
        const iterator = collected
          .values()
          .next()
          .value.attachments.values()
          .next().value;

        const attachmentAudio = { ...iterator };

        if (attachmentAudio.url.includes(".mp3")) {
          DownloadAudio(attachmentAudio.url, `${pathAudio + audioName}.mp3`);
          message.channel.send(
            Reply(Prefix).messageAdd.fileDownloaded +
              " " +
              `You're file is named ${audioName}.mp3`
          );
        } else if (attachmentAudio.url.includes(".wav")) {
          DownloadAudio(attachmentAudio.url, `${pathAudio + audioName}.wav`);
          message.channel.send(
            Reply(Prefix).messageAdd.fileDownloaded +
              " " +
              `You're file is named ${audioName}.wav`
          );
        } else {
          message.channel.send(Reply(Prefix).messageError.audioFileWrongFormat);
        }
      });
  } catch (error) {
    console.warn(error);
  }
}

async function DownloadAudio(url: string, destination: string) {
  const file = fs.createWriteStream(destination);
  https
    .get(url, function (response) {
      response.pipe(file);
      file.on("finish", function () {
        file.close();
        return true;
      });
    })
    .on("error", function (err) {
      // Handle errors
      fs.unlink(destination, (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
    });
}
