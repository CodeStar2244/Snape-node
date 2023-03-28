export const USER_ROUTES = {
    LOGIN : "/login"
}
export const COLLECTION_ROUTES = {
    CREATE_COLLECTION : "/",
    GET_COLLECTIONS : "/",
    GET_COLLECTION_BY_ID : "/:id",
    UPDATE_COLLECTION : "/:id",
    UPLOAD_FILES:"/:id",
    DELETE_COLLECTION:"/:id",
    GET_FILES:"/files/:id",
    DELETE_FILES:"/files/:id",
    CHANGE_COVERPHOTO:"/coverphoto/:id"
}
export const DASHBOARD_ROTUES = {
    GET_SUMMARY : "/summary",
    RECENT_CUSTOMERS : "/recent-customers",
    UPCOMING_BOOKINGS : "/upcoming-bookings",
}