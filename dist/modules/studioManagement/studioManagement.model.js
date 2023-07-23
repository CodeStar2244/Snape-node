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
exports.UpdateSpeciality = exports.GetSpeciality = exports.CreateSpeciality = exports.CreateStudioClientModel = void 0;
var class_validator_1 = require("class-validator");
var model_1 = require("../../helpers/model");
var CreateStudioClientModel = /** @class */ (function (_super) {
    __extends(CreateStudioClientModel, _super);
    function CreateStudioClientModel(body, params) {
        var _this = _super.call(this) || this;
        _this.name = body.name;
        _this.email = body.email;
        _this.phone = body.phone;
        _this.profileUrl = body.profileUrl;
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
            message: 'Please enter question',
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
            message: 'Please enter limit',
        }),
        __metadata("design:type", Number)
    ], GetSpeciality.prototype, "limit", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({
            message: 'Please enter page',
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
//# sourceMappingURL=studioManagement.model.js.map