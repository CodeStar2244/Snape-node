'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SPECIALITY_ROUTES = exports.PORTFOLIO_ROUTES = exports.QUESTIONNARIES_ROUTES = exports.TEMPLATES_ROUTES = exports.STUDIO_MANAGEMENT_ROUTES = exports.AGENT_SERVICE = exports.ASSET_REGISTRY_ROUTES = exports.DASHBOARD_ROTUES = exports.CLIENT_ROUTES = exports.COLLECTION_ROUTES = exports.USER_ROUTES = void 0;
exports.USER_ROUTES = {
  LOGIN: '/login',
  GET_REMANING_SPACE: '/get-remaining-space',
  ENTERPRISE_REGISTER: '/enterprise-register',
  ENTERPRISE_LOGIN: '/enterprise-login',
};
exports.COLLECTION_ROUTES = {
  CREATE_COLLECTION: '/',
  GET_COLLECTIONS: '/',
  GET_COLLECTION_BY_ID: '/:id',
  UPDATE_COLLECTION: '/:id',
  UPLOAD_FILES: '/:id',
  DELETE_COLLECTION: '/:id',
  GET_FILES: '/files/:id',
  GET_FILES_NAME: '/files-name/:id',
  DELETE_FILES: '/files/:id',
  CHANGE_COVERPHOTO: '/coverphoto/:id',
  COLLECTION_DESIGN: '/design/:id',
  LIST_THEMES: '/themes/list-themes',
};
exports.CLIENT_ROUTES = {
  GET_COLLECTION_BY_ID_CLIENT: '/',
  DOWNLOAD_FILE: '/download-file/:id',
  DOWNLOAD_COLLECTION: '/download-collection/:id',
  PIN_CHECK: '/downloadpincheck/:id',
  FILE_PIN_CHECK: '/downloadfilepincheck/:id',
  GET_CLIENT_QUESTIONNARIES: '/view/questionnaries/:id',
  SUBMIT_CLIENT_QUESTIONNARIES: '/questionnaries/:id',
};
exports.DASHBOARD_ROTUES = {
  GET_SUMMARY: '/summary',
  RECENT_CUSTOMERS: '/recent-customers',
  UPCOMING_BOOKINGS: '/upcoming-bookings',
};
exports.ASSET_REGISTRY_ROUTES = {
  CREATE_ASSET: '/',
  GET_ASSET: '/',
  UPDATE_ASSET: '/:id',
  DASHBOARD: '/dashboard',
};
exports.AGENT_SERVICE = {
  LIST_AGENTS: '/list-agents',
  LIST_AGENTS_LOCATIONS: '/list-agents-locations',
  GET_AGENT_DETAILS: '/get-agent-detail/:agentId',
  GET_AGENT_CATEGORIES: '/get-agent-categories/:agentId',
  GET_AGENT_PORTFOLIO: '/get-agent-portfolio/:agentId',
  FAVOURITE: '/favourite/:agentId',
  GET_AGENT_REVIEWS: '/get-agent-reviews/:agentId',
  LIST_FAVOURITES: '/list-favourite-agents',
  BOOK_AGENT: '/bookagent/:id',
};
exports.STUDIO_MANAGEMENT_ROUTES = {
  CREATE_CLIENT: '/client',
  GET_CLIENTS: '/client',
  GET_CLIENT: '/client/:id',
  UPDATE_CLIENT: '/client/:id',
  DELETE_CLIENT: '/client/:id',
};
exports.TEMPLATES_ROUTES = {
  GET_TEMPLATE: '/templates',
  ADD_UPDATE_TEMPLATE: '/templates',
};
exports.QUESTIONNARIES_ROUTES = {
  GET_QUESTIONNARIES: '/questionnaries',
  GET_CLIENT_QUESTIONNARIES: '/questionanries/:id',
  CREATE_QUESTIONNARIES: '/questionnaries',
  DELETE_QUESTIONNARIES: '/questionnaries/:id',
};
exports.PORTFOLIO_ROUTES = {
  CREATE_COLLECTION: '/',
  GET_COLLECTIONS: '/',
  GET_COLLECTION_BY_ID: '/:id',
  UPLOAD_FILES: '/:id',
  DELETE_COLLECTION: '/:id',
  GET_FILES: '/files/:id',
  GET_FILES_NAME: '/files-name/:id',
  DELETE_FILES: '/files/:id',
  CHANGE_COVERPHOTO: '/coverphoto/:id',
  ADD_VIDEO_LINK: '/videolink/:id',
};
exports.SPECIALITY_ROUTES = {
  CREATE_SPECIALITY: '/speciality',
  GET_SPECIALITY: '/speciality',
  EDIT_SPECIALITY: '/speciality/:id',
  DELETE_SPECIALITY: '/speciality/:id',
};
//# sourceMappingURL=routes.js.map