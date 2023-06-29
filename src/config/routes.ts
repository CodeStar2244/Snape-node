export const USER_ROUTES = {
    LOGIN : "/login",
    GET_REMANING_SPACE : "/get-remaining-space",
    ENTERPRISE_REGISTER : "/enterprise-register",
    ENTERPRISE_LOGIN : "/enterprise-login",
}
export const COLLECTION_ROUTES = {
    CREATE_COLLECTION : "/",
    GET_COLLECTIONS : "/",
    GET_COLLECTION_BY_ID : "/:id",
    UPDATE_COLLECTION : "/:id",
    UPLOAD_FILES:"/:id",
    DELETE_COLLECTION:"/:id",
    GET_FILES:"/files/:id",
    GET_FILES_NAME:"/files-name/:id",
    DELETE_FILES:"/files/:id",
    CHANGE_COVERPHOTO:"/coverphoto/:id",
    COLLECTION_DESIGN:"/design/:id",
    LIST_THEMES:"/themes/list-themes",
    
}
export const CLIENT_ROUTES = {
    GET_COLLECTION_BY_ID_CLIENT : "/",
    DOWNLOAD_FILE:"/download-file/:id",
    DOWNLOAD_COLLECTION:"/download-collection/:id"
}
export const DASHBOARD_ROTUES = {
    GET_SUMMARY : "/summary",
    RECENT_CUSTOMERS : "/recent-customers",
    UPCOMING_BOOKINGS : "/upcoming-bookings",
}
export const ASSET_REGISTRY_ROUTES = {
    CREATE_ASSET : "/",
    GET_ASSET : "/",
    UPDATE_ASSET : "/:id",
    DASHBOARD : "/dashboard",
    
}
export const AGENT_SERVICE = {
    LIST_AGENTS : "/list-agents",
    LIST_AGENTS_LOCATIONS : "/list-agents-locations",
    GET_AGENT_DETAILS :"/get-agent-detail/:agentId",
    GET_AGENT_CATEGORIES :"/get-agent-categories/:agentId",
    
}