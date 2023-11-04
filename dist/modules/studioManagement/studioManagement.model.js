"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBooking = exports.CreateQuotation = exports.CreateInvoice = exports.CreateQuestionnaries = exports.CreateTemplate = exports.GetTemplates = exports.UpdateSpeciality = exports.GetSpeciality = exports.CreateSpeciality = exports.UpdateStudioClientModel = exports.CreateStudioClientModel = void 0;
var class_validator_1 = require("class-validator");
var model_1 = require("../../helpers/model");
var CreateStudioClientModel = /** @class */ (function (_super) {
    __extends(CreateStudioClientModel, _super);
    function CreateStudioClientModel(body, params) {
        var _this = _super.call(this) || this;
        _this.name = body.name;
        _this.email = body.email;
        _this.phone = body.phone;
        _this.profileUrl = body === null || body === void 0 ? void 0 : body.profileUrl;
        return _this;
    }
    __decorate([
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateStudioClientModel.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateStudioClientModel.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateStudioClientModel.prototype, "phone", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], CreateStudioClientModel.prototype, "profileUrl", void 0);
    return CreateStudioClientModel;
}(model_1.Model));
exports.CreateStudioClientModel = CreateStudioClientModel;
var UpdateStudioClientModel = /** @class */ (function (_super) {
    __extends(UpdateStudioClientModel, _super);
    function UpdateStudioClientModel(body, params) {
        var _this = _super.call(this) || this;
        _this.name = body.name;
        _this.email = body.email;
        _this.phone = body.phone;
        _this.profileUrl = body === null || body === void 0 ? void 0 : body.profileUrl;
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdateStudioClientModel.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdateStudioClientModel.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdateStudioClientModel.prototype, "phone", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdateStudioClientModel.prototype, "profileUrl", void 0);
    return UpdateStudioClientModel;
}(model_1.Model));
exports.UpdateStudioClientModel = UpdateStudioClientModel;
var CreateSpeciality = /** @class */ (function (_super) {
    __extends(CreateSpeciality, _super);
    function CreateSpeciality(body) {
        var _this = _super.call(this) || this;
        var name = body.name, imageUrl = body.imageUrl;
        _this.name = name === null || name === void 0 ? void 0 : name.trim();
        _this.imageUrl = imageUrl === null || imageUrl === void 0 ? void 0 : imageUrl.trim();
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({
            message: "Please enter question",
        }),
        __metadata("design:type", String)
    ], CreateSpeciality.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], CreateSpeciality.prototype, "imageUrl", void 0);
    return CreateSpeciality;
}(model_1.Model));
exports.CreateSpeciality = CreateSpeciality;
var GetSpeciality = /** @class */ (function (_super) {
    __extends(GetSpeciality, _super);
    function GetSpeciality(_body, query) {
        var _this = _super.call(this) || this;
        var limit = query.limit, page = query.page;
        _this.limit = limit === null || limit === void 0 ? void 0 : limit.trim();
        _this.page = page === null || page === void 0 ? void 0 : page.trim();
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({
            message: "Please enter limit",
        }),
        __metadata("design:type", Number)
    ], GetSpeciality.prototype, "limit", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({
            message: "Please enter page",
        }),
        __metadata("design:type", Number)
    ], GetSpeciality.prototype, "page", void 0);
    return GetSpeciality;
}(model_1.Model));
exports.GetSpeciality = GetSpeciality;
var UpdateSpeciality = /** @class */ (function (_super) {
    __extends(UpdateSpeciality, _super);
    function UpdateSpeciality(body) {
        var _this = _super.call(this) || this;
        var name = body.name, imageUrl = body.imageUrl;
        _this.name = name === null || name === void 0 ? void 0 : name.trim();
        _this.imageUrl = imageUrl === null || imageUrl === void 0 ? void 0 : imageUrl.trim();
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdateSpeciality.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdateSpeciality.prototype, "imageUrl", void 0);
    return UpdateSpeciality;
}(model_1.Model));
exports.UpdateSpeciality = UpdateSpeciality;
var GetTemplates = /** @class */ (function (_super) {
    __extends(GetTemplates, _super);
    function GetTemplates(body, query) {
        var _this = _super.call(this) || this;
        var type = query.type;
        _this.type = type === null || type === void 0 ? void 0 : type.trim();
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsIn)(["Photography", "Videography"]),
        __metadata("design:type", String)
    ], GetTemplates.prototype, "type", void 0);
    return GetTemplates;
}(model_1.Model));
exports.GetTemplates = GetTemplates;
var CreateTemplate = /** @class */ (function (_super) {
    __extends(CreateTemplate, _super);
    function CreateTemplate(body) {
        var _this = _super.call(this) || this;
        var type = body.type, description = body.description, fields = body.fields;
        _this.type = type === null || type === void 0 ? void 0 : type.trim();
        _this.description = description === null || description === void 0 ? void 0 : description.trim();
        _this.fields = fields;
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsIn)(["Photography", "Videography"]),
        __metadata("design:type", String)
    ], CreateTemplate.prototype, "type", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateTemplate.prototype, "description", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Array)
    ], CreateTemplate.prototype, "fields", void 0);
    return CreateTemplate;
}(model_1.Model));
exports.CreateTemplate = CreateTemplate;
var CreateQuestionnaries = /** @class */ (function (_super) {
    __extends(CreateQuestionnaries, _super);
    function CreateQuestionnaries(body) {
        var _this = _super.call(this) || this;
        var name = body.name, type = body.type, email = body.email, clientId = body.clientId, subject = body.subject, message = body.message;
        _this.name = name === null || name === void 0 ? void 0 : name.trim();
        _this.type = type === null || type === void 0 ? void 0 : type.trim();
        _this.email = email === null || email === void 0 ? void 0 : email.trim();
        _this.clientId = clientId;
        _this.subject = subject === null || subject === void 0 ? void 0 : subject.trim();
        _this.message = message === null || message === void 0 ? void 0 : message.trim();
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateQuestionnaries.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsIn)(["Photography", "Videography"]),
        __metadata("design:type", String)
    ], CreateQuestionnaries.prototype, "type", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateQuestionnaries.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], CreateQuestionnaries.prototype, "clientId", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateQuestionnaries.prototype, "subject", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateQuestionnaries.prototype, "message", void 0);
    return CreateQuestionnaries;
}(model_1.Model));
exports.CreateQuestionnaries = CreateQuestionnaries;
var CreateInvoice = /** @class */ (function (_super) {
    __extends(CreateInvoice, _super);
    function CreateInvoice(body) {
        var _this = _super.call(this) || this;
        var name = body.name, currency = body.currency, notes = body.notes, clientId = body.clientId, subject = body.subject;
        _this.name = name === null || name === void 0 ? void 0 : name.trim();
        _this.currency = currency === null || currency === void 0 ? void 0 : currency.trim();
        _this.subject = subject === null || subject === void 0 ? void 0 : subject.trim();
        _this.notes = notes === null || notes === void 0 ? void 0 : notes.trim();
        _this.clientId = clientId;
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateInvoice.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateInvoice.prototype, "currency", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateInvoice.prototype, "subject", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateInvoice.prototype, "notes", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], CreateInvoice.prototype, "clientId", void 0);
    return CreateInvoice;
}(model_1.Model));
exports.CreateInvoice = CreateInvoice;
var CreateQuotation = /** @class */ (function (_super) {
    __extends(CreateQuotation, _super);
    function CreateQuotation(body) {
        var _this = _super.call(this) || this;
        var name = body.name, currency = body.currency, notes = body.notes, clientId = body.clientId, subject = body.subject;
        _this.name = name === null || name === void 0 ? void 0 : name.trim();
        _this.currency = currency === null || currency === void 0 ? void 0 : currency.trim();
        _this.subject = subject === null || subject === void 0 ? void 0 : subject.trim();
        _this.notes = notes === null || notes === void 0 ? void 0 : notes.trim();
        _this.clientId = clientId;
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateQuotation.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateQuotation.prototype, "currency", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateQuotation.prototype, "subject", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateQuotation.prototype, "notes", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], CreateQuotation.prototype, "clientId", void 0);
    return CreateQuotation;
}(model_1.Model));
exports.CreateQuotation = CreateQuotation;
var CreateBooking = /** @class */ (function (_super) {
    __extends(CreateBooking, _super);
    function CreateBooking(body) {
        var _this = _super.call(this) || this;
        var title = body.title, description = body.description, notes = body.notes, clientId = body.clientId, startDate = body.startDate, endDate = body.endDate;
        _this.title = title === null || title === void 0 ? void 0 : title.trim();
        _this.description = description === null || description === void 0 ? void 0 : description.trim();
        _this.startDate = startDate === null || startDate === void 0 ? void 0 : startDate.trim();
        _this.endDate = endDate === null || endDate === void 0 ? void 0 : endDate.trim();
        _this.notes = notes === null || notes === void 0 ? void 0 : notes.trim();
        _this.clientId = clientId;
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateBooking.prototype, "title", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateBooking.prototype, "description", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], CreateBooking.prototype, "notes", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], CreateBooking.prototype, "clientId", void 0);
    __decorate([
        (0, class_validator_1.IsDateString)(),
        __metadata("design:type", Date)
    ], CreateBooking.prototype, "startDate", void 0);
    __decorate([
        (0, class_validator_1.IsDateString)(),
        __metadata("design:type", Date)
    ], CreateBooking.prototype, "endDate", void 0);
    return CreateBooking;
}(model_1.Model));
exports.CreateBooking = CreateBooking;
//# sourceMappingURL=studioManagement.model.js.map