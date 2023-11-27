"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioManagementService = void 0;
var db_config_1 = require("../../db/db.config");
var studioClient_1 = __importDefault(require("../../entities/studioClient"));
var responseBuilder_1 = require("../../helpers/responseBuilder");
var studioSpeciality_1 = require("../../entities/studioSpeciality");
var constants_1 = require("../../config/constants");
var studioTemplate_1 = require("../../entities/studioTemplate");
var studioQuestionnaries_1 = require("../../entities/studioQuestionnaries");
var mailer_1 = require("../../helpers/mailer");
var studioInvoice_1 = __importDefault(require("../../entities/studioInvoice"));
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var studioQuotation_1 = __importDefault(require("../../entities/studioQuotation"));
var studioBooking_1 = __importDefault(require("../../entities/studioBooking"));
var StudioManagementService = /** @class */ (function () {
    function StudioManagementService() {
        var _this = this;
        this.createClient = function (userDetails, body) { return __awaiter(_this, void 0, void 0, function () {
            var studioClientRepository, params, studioClient, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        studioClientRepository = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        params = __assign(__assign({}, body), { createdBy: userDetails.id });
                        if (body.profileUrl) {
                            params = __assign(__assign({}, params), { profileUrl: constants_1.CDN_URL + body.profileUrl });
                        }
                        return [4 /*yield*/, studioClientRepository.save(params)];
                    case 1:
                        studioClient = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(studioClient, "Studio Client created SuccessFully")];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw responseBuilder_1.ResponseBuilder.error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getClient = function (userDetails, search) { return __awaiter(_this, void 0, void 0, function () {
            var studioClientRepository, query, studioclient, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        studioClientRepository = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        return [4 /*yield*/, studioClientRepository
                                .createQueryBuilder("studioclient")
                                .select("studioclient.id", "id")
                                .addSelect("studioclient.name", "name")
                                .addSelect("studioclient.email", "email")
                                .addSelect("studioclient.phone", "phone")
                                .addSelect("studioclient.profileUrl", "profileUrl")
                                .addSelect("studioclient.createdAt", "createdAt")
                                .where("studioclient.createdBy = :agentId", {
                                agentId: userDetails.id,
                            })
                                .loadRelationIdAndMap("agentId", "studioclient.createdBy")];
                    case 1:
                        query = _a.sent();
                        if (search) {
                            query.andWhere("studioclient.name ILIKE :name", {
                                name: "%".concat(search, "%"),
                            });
                            query.andWhere("studioclient.email ILIKE :name", {
                                name: "%".concat(search, "%"),
                            });
                        }
                        return [4 /*yield*/, query.getRawMany()];
                    case 2:
                        studioclient = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(studioclient)];
                    case 3:
                        error_2 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getClientDetails = function (userDetails, clientId) { return __awaiter(_this, void 0, void 0, function () {
            var studioClientRepository, studioclient, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        studioClientRepository = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        return [4 /*yield*/, studioClientRepository.findOne({
                                where: {
                                    id: clientId,
                                    createdBy: userDetails.id,
                                },
                            })];
                    case 1:
                        studioclient = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(studioclient)];
                    case 2:
                        error_3 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editClient = function (params, body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var specialityRepository, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (body.profileUrl) {
                            body = __assign(__assign({}, body), { profileUrl: constants_1.CDN_URL + body.profileUrl });
                        }
                        return [4 /*yield*/, db_config_1.AppDataSource.getRepository(studioClient_1.default)
                                .createQueryBuilder()
                                .update(studioClient_1.default)
                                .set(body)
                                .where("id = :id", { id: params.id })
                                .execute()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db_config_1.AppDataSource.getRepository(studioClient_1.default)
                                .createQueryBuilder("faq")
                                .where("faq.id = :id", { id: params.id })
                                .getOne()];
                    case 2:
                        specialityRepository = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                message: "Client edit successfully",
                                data: specialityRepository,
                            })];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_4 === null || error_4 === void 0 ? void 0 : error_4.message)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteClient = function (userDetails, clientId) { return __awaiter(_this, void 0, void 0, function () {
            var studioClientRepository, studioClient, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        studioClientRepository = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        return [4 /*yield*/, studioClientRepository.findOne({
                                where: {
                                    id: clientId,
                                    createdBy: userDetails.id,
                                },
                            })];
                    case 1:
                        studioClient = _a.sent();
                        if (!studioClient) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Client Not Found", 404)];
                        }
                        return [4 /*yield*/, studioClientRepository.delete({ id: clientId })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(studioClient)];
                    case 3:
                        error_5 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_5);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addSpeciality = function (params, user) { return __awaiter(_this, void 0, void 0, function () {
            var specialityRepository, createUser, data, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        params.createdBy = user.id;
                        specialityRepository = db_config_1.AppDataSource.getRepository(studioSpeciality_1.StudioSpeciality);
                        if (params.imageUrl) {
                            params = __assign(__assign({}, params), { imageUrl: constants_1.CDN_URL + params.imageUrl });
                        }
                        createUser = specialityRepository.create(params);
                        return [4 /*yield*/, specialityRepository.save(createUser)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: data,
                                message: "Speciality added successfully",
                            })];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_6 === null || error_6 === void 0 ? void 0 : error_6.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getSpeciality = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var specialityRepository, query, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        specialityRepository = db_config_1.AppDataSource.getRepository(studioSpeciality_1.StudioSpeciality);
                        return [4 /*yield*/, specialityRepository
                                .createQueryBuilder("studioclient")
                                .select("studioclient.id", "id")
                                .addSelect("studioclient.name", "name")
                                .addSelect("studioclient.imageUrl", "imageUrl")
                                .addSelect("studioclient.createdAt", "createdAt")
                                .where("studioclient.createdBy = :agentId", {
                                agentId: user.id,
                            })
                                .loadRelationIdAndMap("agentId", "studioclient.createdBy")
                                .getRawMany()];
                    case 1:
                        query = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ data: { specialityDetails: query } })];
                    case 2:
                        error_7 = _a.sent();
                        console.log(error_7);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_7 === null || error_7 === void 0 ? void 0 : error_7.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editSpeciality = function (params, body) { return __awaiter(_this, void 0, void 0, function () {
            var specialityRepository, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (body.imageUrl) {
                            body = __assign(__assign({}, params), { imageUrl: constants_1.CDN_URL + body.imageUrl });
                        }
                        return [4 /*yield*/, db_config_1.AppDataSource.getRepository(studioSpeciality_1.StudioSpeciality)
                                .createQueryBuilder()
                                .update(studioSpeciality_1.StudioSpeciality)
                                .set(body)
                                .where("id = :id", { id: params.id })
                                .execute()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db_config_1.AppDataSource.getRepository(studioSpeciality_1.StudioSpeciality)
                                .createQueryBuilder("faq")
                                .where("faq.id = :id", { id: params.id })
                                .getOne()];
                    case 2:
                        specialityRepository = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                message: "Speciality edit successfully",
                                data: specialityRepository,
                            })];
                    case 3:
                        error_8 = _a.sent();
                        console.log(error_8);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_8 === null || error_8 === void 0 ? void 0 : error_8.message)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteSpeciality = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userRepository = db_config_1.AppDataSource.getRepository(studioSpeciality_1.StudioSpeciality);
                        return [4 /*yield*/, userRepository.delete({ id: params.id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                message: "Faq deleted successfully",
                            })];
                    case 2:
                        error_9 = _a.sent();
                        console.log(error_9);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_9 === null || error_9 === void 0 ? void 0 : error_9.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getTemplates = function (user, type) { return __awaiter(_this, void 0, void 0, function () {
            var templateRepo, template, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        templateRepo = db_config_1.AppDataSource.getRepository(studioTemplate_1.StudioTemplate);
                        return [4 /*yield*/, templateRepo.findOne({
                                where: {
                                    createdBy: { id: user === null || user === void 0 ? void 0 : user.id },
                                    type: type,
                                },
                            })];
                    case 1:
                        template = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ data: { template: template } })];
                    case 2:
                        error_10 = _a.sent();
                        console.log(error_10);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_10 === null || error_10 === void 0 ? void 0 : error_10.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createTemplates = function (user, params) { return __awaiter(_this, void 0, void 0, function () {
            var templateRepo, isExist, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        templateRepo = db_config_1.AppDataSource.getRepository(studioTemplate_1.StudioTemplate);
                        return [4 /*yield*/, templateRepo.findOne({
                                where: {
                                    createdBy: { id: user === null || user === void 0 ? void 0 : user.id },
                                    type: params === null || params === void 0 ? void 0 : params.type,
                                },
                            })];
                    case 1:
                        isExist = _a.sent();
                        if (!isExist) return [3 /*break*/, 3];
                        return [4 /*yield*/, templateRepo.update({
                                createdBy: { id: user === null || user === void 0 ? void 0 : user.id },
                                type: params === null || params === void 0 ? void 0 : params.type,
                            }, params)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                message: "Template updated successfully",
                            })];
                    case 3: return [4 /*yield*/, templateRepo.save(__assign(__assign({}, params), { createdBy: user === null || user === void 0 ? void 0 : user.id }))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                message: "Template updated successfully",
                            })];
                    case 5:
                        error_11 = _a.sent();
                        console.log(error_11);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_11 === null || error_11 === void 0 ? void 0 : error_11.message)];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.createQuestionnaries = function (user, params) { return __awaiter(_this, void 0, void 0, function () {
            var quesRepo, templateRepo, clientRepo, template, fields, client, questionnarires, renderData, mailBody, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        quesRepo = db_config_1.AppDataSource.getRepository(studioQuestionnaries_1.StudioQuestionnaries);
                        templateRepo = db_config_1.AppDataSource.getRepository(studioTemplate_1.StudioTemplate);
                        clientRepo = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        return [4 /*yield*/, templateRepo.findOne({
                                where: {
                                    type: params === null || params === void 0 ? void 0 : params.type,
                                    createdBy: user === null || user === void 0 ? void 0 : user.id,
                                },
                            })];
                    case 1:
                        template = _a.sent();
                        fields = {
                            description: template.description,
                            fields: template.fields,
                        };
                        return [4 /*yield*/, clientRepo.findOne({
                                where: { id: params === null || params === void 0 ? void 0 : params.clientId },
                            })];
                    case 2:
                        client = _a.sent();
                        return [4 /*yield*/, quesRepo.save(__assign(__assign({}, params), { template: fields, createdBy: user === null || user === void 0 ? void 0 : user.id }))];
                    case 3:
                        questionnarires = _a.sent();
                        renderData = {
                            userName: (user === null || user === void 0 ? void 0 : user.firstName) + " " + (user === null || user === void 0 ? void 0 : user.lastName),
                            clientName: client === null || client === void 0 ? void 0 : client.name,
                            message: params === null || params === void 0 ? void 0 : params.message,
                            link: "https://studio.snape.app/view/questionnaries/".concat(questionnarires === null || questionnarires === void 0 ? void 0 : questionnarires.id),
                            // link: `http://localhost:3000/view/questionnaries/${questionnarires?.id}`,
                            userEmail: user.email,
                        };
                        return [4 /*yield*/, mailer_1.Mailer.renderTemplate("Questionarries", renderData)];
                    case 4:
                        mailBody = _a.sent();
                        mailer_1.Mailer.sendMail(params.email, params === null || params === void 0 ? void 0 : params.subject, mailBody);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { questionnarires: questionnarires },
                                message: "Questionnaries created successfully",
                            })];
                    case 5:
                        error_12 = _a.sent();
                        console.log(error_12);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_12 === null || error_12 === void 0 ? void 0 : error_12.message)];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.createInvoice = function (user, params) { return __awaiter(_this, void 0, void 0, function () {
            var invoiceRepo, clientRepo, client, invoice, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        invoiceRepo = db_config_1.AppDataSource.getRepository(studioInvoice_1.default);
                        clientRepo = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        return [4 /*yield*/, clientRepo.findOne({
                                where: { id: params === null || params === void 0 ? void 0 : params.clientId },
                            })];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, invoiceRepo.save(__assign(__assign({}, params), { clientId: client === null || client === void 0 ? void 0 : client.id, createdBy: user === null || user === void 0 ? void 0 : user.id }))];
                    case 2:
                        invoice = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { invoice: invoice },
                                message: "invoice created successfully",
                            })];
                    case 3:
                        error_13 = _a.sent();
                        console.log(error_13);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_13 === null || error_13 === void 0 ? void 0 : error_13.message)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getInvoices = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var quesRepo, invoices, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        quesRepo = db_config_1.AppDataSource.getRepository(studioInvoice_1.default);
                        return [4 /*yield*/, quesRepo.find({
                                where: { createdBy: { id: user === null || user === void 0 ? void 0 : user.id } },
                                relations: ["clientId"],
                                order: {
                                    createdAt: "DESC",
                                },
                            })];
                    case 1:
                        invoices = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { invoices: invoices },
                                message: "Invoices listed successfully",
                            })];
                    case 2:
                        error_14 = _a.sent();
                        console.log(error_14);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_14 === null || error_14 === void 0 ? void 0 : error_14.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getInvoice = function (user, id) { return __awaiter(_this, void 0, void 0, function () {
            var quesRepo, invoice, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        quesRepo = db_config_1.AppDataSource.getRepository(studioInvoice_1.default);
                        return [4 /*yield*/, quesRepo.findOne({
                                where: { id: id, createdBy: { id: user === null || user === void 0 ? void 0 : user.id } },
                                relations: ["clientId"],
                            })];
                    case 1:
                        invoice = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { invoice: invoice },
                                message: "Invoice get successfully",
                            })];
                    case 2:
                        error_15 = _a.sent();
                        console.log(error_15);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_15 === null || error_15 === void 0 ? void 0 : error_15.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editInvoice = function (params, body, user) { return __awaiter(_this, void 0, void 0, function () {
            var invoiceRepo, clientRepo, updateReq, client, invoice, formattedDate, renderData, mailBody, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        invoiceRepo = db_config_1.AppDataSource.getRepository(studioInvoice_1.default);
                        clientRepo = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        updateReq = __assign({}, body);
                        updateReq === null || updateReq === void 0 ? true : delete updateReq.sendMail;
                        return [4 /*yield*/, clientRepo.findOne({
                                where: { id: params === null || params === void 0 ? void 0 : params.clientId },
                            })];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, invoiceRepo.update({ id: params === null || params === void 0 ? void 0 : params.id }, updateReq)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, invoiceRepo.findOne({
                                where: { id: params === null || params === void 0 ? void 0 : params.id },
                                relations: ["clientId"],
                            })];
                    case 3:
                        invoice = _a.sent();
                        formattedDate = (0, moment_timezone_1.default)(invoice === null || invoice === void 0 ? void 0 : invoice.paymentDue).format("MMMM D, YYYY");
                        if (!(body === null || body === void 0 ? void 0 : body.sendMail)) return [3 /*break*/, 5];
                        renderData = {
                            userName: (user === null || user === void 0 ? void 0 : user.firstName) + " " + (user === null || user === void 0 ? void 0 : user.lastName),
                            invoiceName: invoice === null || invoice === void 0 ? void 0 : invoice.name,
                            invoiceAmount: invoice === null || invoice === void 0 ? void 0 : invoice.totalAmount,
                            invoiceDetails: invoice === null || invoice === void 0 ? void 0 : invoice.invoiceDetails,
                            dueDate: formattedDate,
                            clientName: client === null || client === void 0 ? void 0 : client.name,
                            currency: invoice === null || invoice === void 0 ? void 0 : invoice.currency,
                            userEmail: user.email,
                            subTotalAmount: invoice === null || invoice === void 0 ? void 0 : invoice.subTotalAmount,
                            totalAmount: invoice === null || invoice === void 0 ? void 0 : invoice.totalAmount,
                            discount: invoice === null || invoice === void 0 ? void 0 : invoice.discount,
                            tax: invoice === null || invoice === void 0 ? void 0 : invoice.tax,
                        };
                        return [4 /*yield*/, mailer_1.Mailer.renderTemplate("Invoice", renderData)];
                    case 4:
                        mailBody = _a.sent();
                        mailer_1.Mailer.sendMail(client === null || client === void 0 ? void 0 : client.email, params === null || params === void 0 ? void 0 : params.subject, mailBody);
                        _a.label = 5;
                    case 5: return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                            message: "Invoice edit successfully",
                            data: invoice,
                        })];
                    case 6:
                        error_16 = _a.sent();
                        console.log(error_16);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_16 === null || error_16 === void 0 ? void 0 : error_16.message)];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.deleteInvoice = function (user, id) { return __awaiter(_this, void 0, void 0, function () {
            var invoiceRepo, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        invoiceRepo = db_config_1.AppDataSource.getRepository(studioInvoice_1.default);
                        return [4 /*yield*/, invoiceRepo.delete({
                                id: id,
                                createdBy: { id: user === null || user === void 0 ? void 0 : user.id },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: {},
                                message: "Invoices deleted successfully",
                            })];
                    case 2:
                        error_17 = _a.sent();
                        console.log(error_17);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_17 === null || error_17 === void 0 ? void 0 : error_17.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createQuotation = function (user, params) { return __awaiter(_this, void 0, void 0, function () {
            var invoiceRepo, clientRepo, client, invoice, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        invoiceRepo = db_config_1.AppDataSource.getRepository(studioQuotation_1.default);
                        clientRepo = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        return [4 /*yield*/, clientRepo.findOne({
                                where: { id: params === null || params === void 0 ? void 0 : params.clientId },
                            })];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, invoiceRepo.save(__assign(__assign({}, params), { clientId: client === null || client === void 0 ? void 0 : client.id, createdBy: user === null || user === void 0 ? void 0 : user.id }))];
                    case 2:
                        invoice = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { invoice: invoice },
                                message: "quotation created successfully",
                            })];
                    case 3:
                        error_18 = _a.sent();
                        console.log(error_18);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_18 === null || error_18 === void 0 ? void 0 : error_18.message)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getQuotations = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var quesRepo, quotations, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        quesRepo = db_config_1.AppDataSource.getRepository(studioQuotation_1.default);
                        return [4 /*yield*/, quesRepo.find({
                                where: { createdBy: { id: user === null || user === void 0 ? void 0 : user.id } },
                                relations: ["clientId"],
                                order: {
                                    createdAt: "DESC",
                                },
                            })];
                    case 1:
                        quotations = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { quotations: quotations },
                                message: "Quotations listed successfully",
                            })];
                    case 2:
                        error_19 = _a.sent();
                        console.log(error_19);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_19 === null || error_19 === void 0 ? void 0 : error_19.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getQuotation = function (user, id) { return __awaiter(_this, void 0, void 0, function () {
            var quesRepo, quotation, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        quesRepo = db_config_1.AppDataSource.getRepository(studioQuotation_1.default);
                        return [4 /*yield*/, quesRepo.findOne({
                                where: { id: id, createdBy: { id: user === null || user === void 0 ? void 0 : user.id } },
                                relations: ["clientId"],
                            })];
                    case 1:
                        quotation = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { quotation: quotation },
                                message: "Quotation get successfully",
                            })];
                    case 2:
                        error_20 = _a.sent();
                        console.log(error_20);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_20 === null || error_20 === void 0 ? void 0 : error_20.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editQuotation = function (params, body, user) { return __awaiter(_this, void 0, void 0, function () {
            var invoiceRepo, clientRepo, updateReq, client, quotation, renderData, mailBody, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        invoiceRepo = db_config_1.AppDataSource.getRepository(studioQuotation_1.default);
                        clientRepo = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        updateReq = __assign({}, body);
                        updateReq === null || updateReq === void 0 ? true : delete updateReq.sendMail;
                        return [4 /*yield*/, clientRepo.findOne({
                                where: { id: params === null || params === void 0 ? void 0 : params.clientId },
                            })];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, invoiceRepo.update({ id: params === null || params === void 0 ? void 0 : params.id }, updateReq)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, invoiceRepo.findOne({
                                where: { id: params === null || params === void 0 ? void 0 : params.id },
                                relations: ["clientId"],
                            })];
                    case 3:
                        quotation = _a.sent();
                        if (!(body === null || body === void 0 ? void 0 : body.sendMail)) return [3 /*break*/, 5];
                        renderData = {
                            userName: (user === null || user === void 0 ? void 0 : user.firstName) + " " + (user === null || user === void 0 ? void 0 : user.lastName),
                            invoiceName: quotation === null || quotation === void 0 ? void 0 : quotation.name,
                            invoiceAmount: quotation === null || quotation === void 0 ? void 0 : quotation.totalAmount,
                            invoiceDetails: quotation === null || quotation === void 0 ? void 0 : quotation.invoiceDetails,
                            validFor: quotation === null || quotation === void 0 ? void 0 : quotation.validFor,
                            clientName: client === null || client === void 0 ? void 0 : client.name,
                            currency: quotation === null || quotation === void 0 ? void 0 : quotation.currency,
                            userEmail: user.email,
                            subTotalAmount: quotation === null || quotation === void 0 ? void 0 : quotation.subTotalAmount,
                            totalAmount: quotation === null || quotation === void 0 ? void 0 : quotation.totalAmount,
                            discount: quotation === null || quotation === void 0 ? void 0 : quotation.discount,
                            tax: quotation === null || quotation === void 0 ? void 0 : quotation.tax,
                        };
                        return [4 /*yield*/, mailer_1.Mailer.renderTemplate("Quotation", renderData)];
                    case 4:
                        mailBody = _a.sent();
                        mailer_1.Mailer.sendMail(client === null || client === void 0 ? void 0 : client.email, params === null || params === void 0 ? void 0 : params.subject, mailBody);
                        _a.label = 5;
                    case 5: return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                            message: "Quotation edit successfully",
                            data: quotation,
                        })];
                    case 6:
                        error_21 = _a.sent();
                        console.log(error_21);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_21 === null || error_21 === void 0 ? void 0 : error_21.message)];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.deleteQuotation = function (user, id) { return __awaiter(_this, void 0, void 0, function () {
            var invoiceRepo, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        invoiceRepo = db_config_1.AppDataSource.getRepository(studioQuotation_1.default);
                        return [4 /*yield*/, invoiceRepo.delete({
                                id: id,
                                createdBy: { id: user === null || user === void 0 ? void 0 : user.id },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: {},
                                message: "Quotation deleted successfully",
                            })];
                    case 2:
                        error_22 = _a.sent();
                        console.log(error_22);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_22 === null || error_22 === void 0 ? void 0 : error_22.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createBooking = function (user, params) { return __awaiter(_this, void 0, void 0, function () {
            var invoiceRepo, clientRepo, client, booking, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        invoiceRepo = db_config_1.AppDataSource.getRepository(studioBooking_1.default);
                        clientRepo = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        return [4 /*yield*/, clientRepo.findOne({
                                where: { id: params === null || params === void 0 ? void 0 : params.clientId },
                            })];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, invoiceRepo.save(__assign(__assign({}, params), { clientId: client === null || client === void 0 ? void 0 : client.id, createdBy: user === null || user === void 0 ? void 0 : user.id }))];
                    case 2:
                        booking = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { booking: booking },
                                message: "booking created successfully",
                            })];
                    case 3:
                        error_23 = _a.sent();
                        console.log(error_23);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_23 === null || error_23 === void 0 ? void 0 : error_23.message)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getBookings = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var quesRepo, booking, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        quesRepo = db_config_1.AppDataSource.getRepository(studioBooking_1.default);
                        return [4 /*yield*/, quesRepo.find({
                                where: { createdBy: { id: user === null || user === void 0 ? void 0 : user.id } },
                                relations: ["clientId"],
                            })];
                    case 1:
                        booking = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { booking: booking },
                                message: "booking listed successfully",
                            })];
                    case 2:
                        error_24 = _a.sent();
                        console.log(error_24);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_24 === null || error_24 === void 0 ? void 0 : error_24.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getBooking = function (user, id) { return __awaiter(_this, void 0, void 0, function () {
            var quesRepo, booking, error_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        quesRepo = db_config_1.AppDataSource.getRepository(studioBooking_1.default);
                        return [4 /*yield*/, quesRepo.findOne({
                                where: { id: id, createdBy: { id: user === null || user === void 0 ? void 0 : user.id } },
                                relations: ["clientId"],
                            })];
                    case 1:
                        booking = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { booking: booking },
                                message: "Booking get successfully",
                            })];
                    case 2:
                        error_25 = _a.sent();
                        console.log(error_25);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_25 === null || error_25 === void 0 ? void 0 : error_25.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editBooking = function (params, body) { return __awaiter(_this, void 0, void 0, function () {
            var invoiceRepo, booking, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        invoiceRepo = db_config_1.AppDataSource.getRepository(studioBooking_1.default);
                        return [4 /*yield*/, invoiceRepo.update({ id: params === null || params === void 0 ? void 0 : params.id }, body)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, invoiceRepo.findOne({
                                where: { id: params === null || params === void 0 ? void 0 : params.id },
                                relations: ["clientId"],
                            })];
                    case 2:
                        booking = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                message: "booking edit successfully",
                                data: booking,
                            })];
                    case 3:
                        error_26 = _a.sent();
                        console.log(error_26);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_26 === null || error_26 === void 0 ? void 0 : error_26.message)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteBooking = function (user, id) { return __awaiter(_this, void 0, void 0, function () {
            var invoiceRepo, error_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        invoiceRepo = db_config_1.AppDataSource.getRepository(studioBooking_1.default);
                        return [4 /*yield*/, invoiceRepo.delete({
                                id: id,
                                createdBy: { id: user === null || user === void 0 ? void 0 : user.id },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: {},
                                message: "Booking deleted successfully",
                            })];
                    case 2:
                        error_27 = _a.sent();
                        console.log(error_27);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_27 === null || error_27 === void 0 ? void 0 : error_27.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getQuestionnaries = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var quesRepo, questionnarires, error_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        quesRepo = db_config_1.AppDataSource.getRepository(studioQuestionnaries_1.StudioQuestionnaries);
                        return [4 /*yield*/, quesRepo.find({
                                where: { createdBy: { id: user === null || user === void 0 ? void 0 : user.id } },
                                order: { createdAt: "DESC" },
                                relations: ["clientId"],
                                select: ["id", "email", "name", "type", "status", "createdAt"],
                            })];
                    case 1:
                        questionnarires = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { questionnarires: questionnarires },
                                message: "Questionnaries created successfully",
                            })];
                    case 2:
                        error_28 = _a.sent();
                        console.log(error_28);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_28 === null || error_28 === void 0 ? void 0 : error_28.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getClientQuestionnaries = function (user, id) { return __awaiter(_this, void 0, void 0, function () {
            var quesRepo, questionnarires, error_29;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        quesRepo = db_config_1.AppDataSource.getRepository(studioQuestionnaries_1.StudioQuestionnaries);
                        return [4 /*yield*/, quesRepo.findOne({
                                where: { id: id, createdBy: { id: user === null || user === void 0 ? void 0 : user.id } },
                                relations: ["clientId"],
                            })];
                    case 1:
                        questionnarires = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: { questionnarires: questionnarires },
                                message: "Questionnaries created successfully",
                            })];
                    case 2:
                        error_29 = _a.sent();
                        console.log(error_29);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_29 === null || error_29 === void 0 ? void 0 : error_29.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteQuestionnaries = function (user, id) { return __awaiter(_this, void 0, void 0, function () {
            var quesRepo, error_30;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        quesRepo = db_config_1.AppDataSource.getRepository(studioQuestionnaries_1.StudioQuestionnaries);
                        return [4 /*yield*/, quesRepo.delete({
                                id: id,
                                createdBy: { id: user === null || user === void 0 ? void 0 : user.id },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                data: {},
                                message: "Questionnaries deleted successfully",
                            })];
                    case 2:
                        error_30 = _a.sent();
                        console.log(error_30);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest(error_30 === null || error_30 === void 0 ? void 0 : error_30.message)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return StudioManagementService;
}());
exports.StudioManagementService = StudioManagementService;
//# sourceMappingURL=studioManagement.service.js.map