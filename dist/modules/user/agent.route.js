"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
var express_1 = require("express");
var routes_1 = require("../../config/routes");
var agent_controller_1 = require("./agent.controller");
// Assign router to the express.Router() instance
var router = (0, express_1.Router)();
var userController = new agent_controller_1.UserController();
//Signup
router.post(routes_1.USER_ROUTES.LOGIN, userController.login);
exports.UserRoute = router;
//# sourceMappingURL=agent.route.js.map