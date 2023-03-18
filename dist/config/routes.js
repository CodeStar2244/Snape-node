"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLLECTION_ROUTES = exports.USER_ROUTES = void 0;
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
    GET_FILES: "/files/:id"
};
//# sourceMappingURL=routes.js.map