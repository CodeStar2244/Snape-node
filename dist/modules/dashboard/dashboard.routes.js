'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DashboardRoute = void 0;
var express_1 = require('express');
var routes_1 = require('../../config/routes');
var dashboard_controller_1 = require('./dashboard.controller');
var router = (0, express_1.Router)();
var collectoinController = new dashboard_controller_1.DashboardController();
router.get(routes_1.DASHBOARD_ROTUES.GET_SUMMARY, collectoinController.getSummary);
router.get(routes_1.DASHBOARD_ROTUES.RECENT_CUSTOMERS, collectoinController.recentCustomers);
router.get(routes_1.DASHBOARD_ROTUES.UPCOMING_BOOKINGS, collectoinController.upcomingBookings);
exports.DashboardRoute = router;
//# sourceMappingURL=dashboard.routes.js.map