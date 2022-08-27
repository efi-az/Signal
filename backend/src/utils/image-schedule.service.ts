import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import * as fs from "fs";

@Injectable()
export class ImageScheduleService {
  constructor() {
  }

  // At 12:00 AM, only on Monday => 0 0 * * 1
  @Cron(CronExpression.EVERY_WEEKEND, {
    name: "imagesDeleted",
    timeZone: "Asia/Tehran"
  })
  handleCron() {
    let filenames = [];
    fs.readdirSync(process.cwd() + "/assets/").forEach(file => {
      filenames.push(file);
    });

    const today = new Date().getDay() - 1;
    for (const filename of filenames) {
      let fileDate = parseInt(filename.substring(0, 10).split("-")[2]);
      if (today > fileDate) {
        try {
          fs.unlinkSync(process.cwd() + "/assets/" + filename);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}