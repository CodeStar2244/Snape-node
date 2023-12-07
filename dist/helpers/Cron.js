"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cron = void 0;
var cron_1 = require("cron");
var studioManagement_service_1 = require("..//modules/studioManagement/studioManagement.service");
var Cron = /** @class */ (function () {
    function Cron() {
        var _this = this;
        this.dailyCron = function () {
            new cron_1.CronJob("* * * * * *", function () {
                // console.log("You will see this message every second");
                _this.studioManagementService.cronDuePayment();
            }, null, true);
        };
        this.dailyCron();
        this.studioManagementService = new studioManagement_service_1.StudioManagementService();
    }
    return Cron;
}());
exports.Cron = Cron;
//# sourceMappingURL=Cron.js.map