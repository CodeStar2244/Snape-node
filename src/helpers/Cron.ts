import { CronJob } from "cron";
import { StudioManagementService } from "..//modules/studioManagement/studioManagement.service";

export class Cron {
  public studioManagementService: StudioManagementService;
  constructor() {
    this.dailyCron();
    this.studioManagementService = new StudioManagementService();
  }

  public dailyCron = () => {
    new CronJob(
      "* * * * * *",
      () => {
        // console.log("You will see this message every second");
        this.studioManagementService.cronDuePayment();
      },
      null,
      true,
    );
  };
}
