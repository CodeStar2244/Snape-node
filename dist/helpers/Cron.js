"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cron = void 0;
var cron_1 = require("cron");
var Cron = /** @class */ (function () {
    function Cron() {
        this.dailyCron = function () {
            console.log("-------=========");
            new cron_1.CronJob("* * * * * *", function () {
                console.log("You will see this message every second");
            }, null, true);
        };
        console.log("----------------------------");
        this.dailyCron();
    }
    return Cron;
}());
exports.Cron = Cron;
//# sourceMappingURL=Cron.js.map