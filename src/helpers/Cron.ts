import { CronJob } from "cron";

export class Cron {
  constructor() {
    this.dailyCron();
  }

  public dailyCron = () => {
    new CronJob(
      "* * * * * *",
      function () {
        console.log("You will see this message every second");
      },
      null,
      true,
    );
  };
}
