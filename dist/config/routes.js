"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STUDIO_MANAGEMENT_ROUTES = exports.AGENT_SERVICE = exports.ASSET_REGISTRY_ROUTES = exports.DASHBOARD_ROTUES = exports.CLIENT_ROUTES = exports.COLLECTION_ROUTES = exports.USER_ROUTES = void 0;
exports.USER_ROUTES = {
    LOGIN: "/login",
    GET_REMANING_SPACE: "/get-remaining-space",
    ENTERPRISE_REGISTER: "/enterprise-register",
    ENTERPRISE_LOGIN: "/enterprise-login",
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
exports.ASSET_REGISTRY_ROUTES = {
    CREATE_ASSET: "/",
    GET_ASSET: "/",
    UPDATE_ASSET: "/:id",
    DASHBOARD: "/dashboard",
};
exports.AGENT_SERVICE = {
    LIST_AGENTS: "/list-agents",
    LIST_AGENTS_LOCATIONS: "/list-agents-locations",
    GET_AGENT_DETAILS: "/get-agent-detail/:agentId",
    GET_AGENT_CATEGORIES: "/get-agent-categories/:agentId",
    FAVOURITE: "/favourite/:agentId",
    GET_AGENT_REVIEWS: "/get-agent-reviews/:agentId",
    LIST_FAVOURITES: "/list-favourite-agents",
};
exports.STUDIO_MANAGEMENT_ROUTES = {
    CREATE_CLIENT: "/client",
    GET_CLIENTS: "/client",
    GET_CLIENT: "/client/:id",
    DELETE_CLIENT: "/client"
};
//# sourceMappingURL=routes.js.map