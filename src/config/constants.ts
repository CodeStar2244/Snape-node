export const MESSAGE = {
    TIMEZONE: "Asia/Kolkata",
    PASSWORD_SALT: 8,
  };
  
  export const CODE = "CODE";
  export const BAD_DATA = "BAD_DATA";
  export const TIME_STAMP_FORMAT = "YYYY-MM-DD HH:mm:ss";
  export const TIME_FORMAT = "HH:mm:ss";
  export const RECORDS_PER_PAGE = 10;
  export const IMAGE_EXT = [".jpg", ".jpeg", ".png"];
  export const DATE_FORMAT = "YYYY-MM-DD";
  export const DATE_FORMAT_REPORT = "DD-MM-YYYY HH:mm";
  export const DATE_FORMAT_REPORT_DATE = "DD-MM-YYYY";
  export const RES_CODE = {
    error: {
      badRequest: 400,
      forbidden: 403,
      internalServerError: 500,
      notFound: 404,
      unauthorized: 401,
    },
    success: 200,
  };
  export const RES_STATUS = {
    FAIL: "fail",
    SUCCESS: "success",
  };
  
  export const EMAIL_MESSAGE = {
    INQUIRY: {
      SUBJECT: "User Registration: ",
      REPORT: "Gymfans Transaction Report:",
    },
    REPORT_EMAIL: {
      SUBJECT: "Gymfans transaction report: From",
      BODY: "Please find the transaction report for duration From {{DATE}} in attachment.",
      REGARDS: "Regards,",
      REGARDS_MESSAGEL: "Gymfans Team",
      HEADER: "Transaction Report",
    },
    REGISTER_EMAIL: {
      SUBJECT: "Registration - Gymfans",
      HEADER: "Registration",
      BODY: "Thank you for your registration. Please verify your email with the OTP below.",
      REGARDS: "Regards,",
      REGARDS_MESSAGEL: "Gymfans Team",
      NOTE: "OTP will expire after {{MIN}} minutes.",
    },
    FORGOT_PASSWORD_EMAIL: {
      SUBJECT: "One time pin to reset password - Gymfans",
      HEADER: "One time pin to reset password",
      BODY: "Please enter the OTP to reset your password.",
      REGARDS: "Regards,",
      REGARDS_MESSAGEL: "Gymfans Team",
      NOTE: "OTP will expire after {{MIN}} minutes.",
    },
    EMAIL_UPDATE_EMAIL: {
      SUBJECT: "One time pin to updating an email - Gymfans",
      HEADER: "One time pin to update email",
      BODY: "Please enter the OTP to update your email account.",
      REGARDS: "Regards,",
      REGARDS_MESSAGEL: "Gymfans Team",
      NOTE: "OTP will expire after {{MIN}} minutes.",
    },
    DELET_USER_EMAIL: {
      SUBJECT: "One time pin to delete account - Gymfans",
      HEADER: "One time pin to delete account",
      BODY: "Please enter the OTP to delete your account.",
      REGARDS: "Regards,",
      REGARDS_MESSAGEL: "Gymfans Team",
      NOTE: "OTP will expire after {{MIN}} minutes.",
    },
  };
  
  export enum DURATION {
    "1WEEK" = "1 Week",
    "2WEEK" = "2 Week",
  }
  
  export enum DISCOUNTPERCENTAGE {
    "5%" = "5%",
    "10%" = "10%",
    "20%" = "20%",
    "30%" = "30%",
    "40%" = "40%",
    "50%" = "50%",
  }
  
  export const SOCKET_EVENTS = {
      JOIN_ROOM: "joinRoom",
      CONNECT: "connection",
      DISCONNECT: "disconnect",
      ON_MESSAGE: "onNewMessage",
      RECEIVE_MESSAGE: 'receiverMessage',
      ADD_POST: "addPost",
      ADD_LIKE: "addLike",
      ADD_COMMENT: "addComment",
      ADD_POST_LIKE: "addPostLike",
      LISTEN_ADD_LIKE: "listenAddLike",
      USER_DELETE: 'userDeleted',
      POST_UPLOADED:'postUploaded',
    ADD_STORY: "addStory",
    }
    
  export const TABLES = {
    USER: "users",
    CATEGORY: "categories",
    CARD: "cards",
  };
  
  export const ROUTES = {
    LOGIN: "/login",
    REGISTER: "/register",
    CREATE: "/create",
    VERIFY_OTP: "/verify-otp",
    SEND_OTP: "/send-otp",
    RESET_PASSWORD: "/reset-password",
    SOCIAL_SIGNUP: "/social-signup",
    CHECK_SOCIAL: "/check-social",
    PROFILE: "/profile",
    EDIT_PROFILE: "/edit-profile",
    CHANGE_PASSWORD: "/change-password",
    CONTACT_US: "/contact-us",
    LOGOUT: "/logout",
    FB_DELETE_DATA: "/fb-delete-data",
    APPLE_DATA: "/check-apple-data",
    UPLOAD: "/image-upload",
    SETTINGS: "/setting",
    GET_SETTING: "/get-setting",
    DELETE_STATUS: "/delete-status/:userId",
    REDIRECT_APPLE_SIGNIN: "/redirect-apple-signin",
    ADD_CARD: "/add-card",
    GET_CARD: "/get-card",
    DELETE_CARD: "/delete-card",
    UPDATE_CARD: "/update-card",
    SET_PRIMARY_CARD: "/set-primary-card",
    ADD_BANK: "/add-bank",
    GET_BANK: "/get-bank",
    ADD_WALLET: "/add-wallet",
    ADD_GYM_PLAN: "/add-gym-plan",
    GET_GYM_PLAN: "/get-gym-plan",
    UPDATE_GYM_PLAN: "/update-gym-plan",
    DELETE_GYM_PLAN: "/delete-gym-plan",
    ADD_POST: "/add-post",
    UPLOAD_IMAGE: "/upload-image/:postId",
    GET_POST: "/get-post",
    UPLOAD_VIDEO: "/upload-video/:postId",
    UPLOAD_AUDIO: "/upload-audio/:postId",
    GET_WALLET_SETTING: "/get-wallet-setting",
    SCHEDULE_POST: "/schedule-post",
    GET_POST_CONTENT_CREATOR: "/popular-content-creator",
    GET_SEARCH_CATEGORY: "/search",
    USER_PROFILE: "/user-profile",
    GET_POST_LISTING: "/likes",
    GET_POST_COMMENT: "/comments",
    USER_NOTIFICATION: "/get-notification",
    GET_POST_DETAILS: "/get-post-details",
    USER_BLOCK: "/block-unblock",
    GET_BLOCK_USER: "/block-details",
    UPDATE_FCM_TOKEN: "/update-fcm-token",
    USER_READ_NOTIFICATION: "/read-notification",
    ADD_POST_BOOKMARK: "/add-remove-bookmark",
    BOOKMARKS: "/bookmarks",
    REMOVE_POST_BOOKMARK: "/remove-bookmark",
    ADD_POST_HIDE: "/hide",
    ADD_POST_REPORT: "/report",
    OTHER_USER_PLAN_LIST: "/other-user-plan-list",
    QR_CODE_USER_ROFILE: "/qr-user-data",
    CREATE_EVENT: "/create",
    GET_EVENT: "/get",
    OTHER_USER_EVENT: "/other-user",
    DELETE_EVENT: "/delete",
    GET_EVENT_DETAILS: "/details",
    GET_CALENDER_EVENT: "/calender-event",
    CONTENT_CREATOR_LIST: "/content-creator-list",
    CREATE_PROMOTION: "/create",
    GET_PROMOTION: "/get",
    LIST_PROMOTION: "/list",
    DELETE_PROMOTION: "/delete",
    GET_DURATION: "/get-duration-and-discount",
    OTHER_USER_PLANS: "/get-other-user-plans",
    USER_SUBSCRIPTION_PLAN_LIST: "/subscription-list",
    USER_SUBSCRIBED_PLAN_LIST: "/subscribed-list",
    GET_AGORA_TOKEN: "/get-agora-token/:id",
    PEOPLE_YOU_MAY_KNOW: "/people-you-may-know",
    USER_FRIEND_REQUEST_LIST: "/friend-request",
    EVENT_SUGGESTIONS: "/suggestions",
    START_RECORDINGS: "/start-recording",
    END_RECORDINGS: "/end-recording",
    USER_TRANSACTION_REPORT: "/transaction-report",
    COUNTRY_LIST: "/country",
    STATE_LIST: "/states",
    LANGUAGES: "/languages",
    GET_CMS: "/cms/:type",
    GET_FAQ: "/faq",
    DELETE_USER_DATA: "/delete-user-data",
    DELETE_ACCOUNT: "/delete-account",
    ADD_STORY: "/add-story",
    UPLOAD_IMAGE_STORY: "/upload-image-story/:storyId",
    UPLOAD_VIDEO_STORY: "/upload-video-story/:storyId",
    UPLOAD_AUDIO_STORY: "/upload-audio-story/:storyId",
    UPDATE_STORY: "/update-story/:storyId",
    GET_STORY: "/get-story",
    VIEW_STORY: "/view-story/:storyId",
    REMOVE_STORY: "/remove-story/:storyId",
    GET_USER_STORY: "/get-user-story",
    GET_USER_LIST_STORY: "/get-user-list-story",
    GET_USER_LIST_VIEW_STORY: "/get-user-list-view-story/:storyId",
    GET_STORY_ID:"/get-story-id/:storyId",
  };
  
  export const CATEGORY_ROUTES = {
    CREATE_CATEGORY: "/create-category",
    GET_CATEGORY: "/get-category",
    GET_USER_CATEGORY: "/user-categories",
    SAVE_USER_CATEGORY: "/save-user-category",
  };
  
  export const SOCIAL_TYPE = {
    GMAIL: "google",
    DIRECT_USER: "directUser",
    FACEBOOK: "facebook",
    APPLE: "apple",
  };
  
  export const EVENT_TYPE = {
    MY_EVENT: "myEvent",
    ALL_EVENT: "allEvent",
    ATTEND: "attend",
  };
  
  export const USER_TYPE = {
    REGULAR_USER: "regularUser",
    CONTENT_USER: "contentUser",
  };
  
  export const APPLE_DATA = {
    TEAM_ID: "57V8NKTKQS",
    GRANT_TYPE: {
      REFRESH_TOKEN: "refresh_token",
      AUTH_CODE: "authorization_code",
    },
  };
  
  export const DEVICE_TYPE = {
    IOS: "ios",
    WEBSITE: "website",
  };
  