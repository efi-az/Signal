import {
  MulterModuleOptions,
  MulterOptionsFactory
} from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { generateRandomString } from "../../utils/utils";

export class MulterConfigurations implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    const maxSize: number = 1 * 1024 * 1024;
    const today = new Date();
    let newFileName;
    const options: MulterModuleOptions = {
      storage: diskStorage({
        destination: "./assets",
        filename: (req, file, cb) => {
          const name = file.originalname.split(".")[0];
          const fileExtension = file.originalname.split(".")[1];
          newFileName = "" +
            today.getFullYear() +
            today.getMonth() +
            today.getDay() +
            "_" +
            generateRandomString(15) +
            "." +
            fileExtension;
          file.originalname = newFileName;

          cb(null, newFileName);
        }
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|png)$/)) {
          return cb(new Error("You must send a PNG or jpg file"), false);
        }

        return cb(null, true);
      },
      limits: { fileSize: maxSize }
    };

    return options;
  }

}
