"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DASHBOARD_ROTUES = exports.CLIENT_ROUTES = exports.COLLECTION_ROUTES = exports.USER_ROUTES = void 0;
exports.USER_ROUTES = {
    LOGIN: "/login"
};
exports.COLLECTION_ROUTES = {
    CREATE_COLLECTION: "/",
    GET_COLLECTIONS: "/",
    GET_COLLECTION_BY_ID: "/:id",
    UPDATE_COLLECTION: "/:id",
    UPLOAD_FILES: "/:id",
    DELETE_COLLECTION: "/:id",
    GET_FILES: "/files/:id",
    GET_FILES_NAME: "/files-name/:id",
    DELETE_FILES: "/files/:id",
    CHANGE_COVERPHOTO: "/coverphoto/:id",
    COLLECTION_DESIGN: "/design/:id",
    LIST_THEMES: "/themes/list-themes",
};
exports.CLIENT_ROUTES = {
    GET_COLLECTION_BY_ID_CLIENT: "/",
    DOWNLOAD_FILE: "/download-file/:id",
    DOWNLOAD_COLLECTION: "/download-collection/:id"
};
exports.DASHBOARD_ROTUES = {
    GET_SUMMARY: "/summary",
    RECENT_CUSTOMERS: "/recent-customers",
    UPCOMING_BOOKINGS: "/upcoming-bookings",
};
//# sourceMappingURL=routes.js.map