import * as fs from "fs";
import { FileCheck } from "../../types/command";

export function CheckForFile(pathName: string): Promise<FileCheck> {
  return new Promise((resolve, reject) => {
    fs.open(pathName, "r", (err, fd) => {
      if (err) {
        resolve(FileCheck.NOT_FOUND);
      } else {
        resolve(FileCheck.FILE_EXIST);
      }
    });
  });
}

export function GetItemsDir(dirPath: string) {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name);
}
