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
exports.UploadFilesModel = exports.PortfolioDesignModel = exports.UpdatePortfolioModel = exports.PortfolioGetModel = void 0;
var class_validator_1 = require("class-validator");
var Portfolio_1 = require("../../entities/Portfolio");
var Files_1 = require("../../entities/Files");
var model_1 = require("../../helpers/model");
var collectionDesign_1 = require("../../entities/collectionDesign");
var assetRegistry_model_1 = require("../assetRegistry/assetRegistry.model");
var PortfolioGetModel = /** @class */ (function (_super) {
    __extends(PortfolioGetModel, _super);
    function PortfolioGetModel(body, params) {
        var _this = _super.call(this) || this;
        _this.order = params.order;
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsEnum)(assetRegistry_model_1.OrderValidation),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], PortfolioGetModel.prototype, "order", void 0);
    return PortfolioGetModel;
}(model_1.Model));
exports.PortfolioGetModel = PortfolioGetModel;
var UpdatePortfolioModel = /** @class */ (function (_super) {
    __extends(UpdatePortfolioModel, _super);
    function UpdatePortfolioModel(body, params) {
        var _this = _super.call(this) || this;
        _this.name = body.name;
        _this.eventDate = body.eventDate;
        _this.url = body.url;
        _this.status = body.status;
        _this.download = body.download;
        _this.downloadPin = body.downloadPin;
        _this.password = body.password;
        _this.tags = body.tags;
        _this.socialSharing = body.socialSharing;
        _this.coverPhoto = body.coverPhoto;
        _this.slug = body.slug;
        return _this;
    }
    __decorate([
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdatePortfolioModel.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdatePortfolioModel.prototype, "url", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdatePortfolioModel.prototype, "slug", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdatePortfolioModel.prototype, "coverPhoto", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Date)
    ], UpdatePortfolioModel.prototype, "eventDate", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdatePortfolioModel.prototype, "password", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdatePortfolioModel.prototype, "downloadPin", void 0);
    __decorate([
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Array)
    ], UpdatePortfolioModel.prototype, "tags", void 0);
    __decorate([
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Boolean)
    ], UpdatePortfolioModel.prototype, "download", void 0);
    __decorate([
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Boolean)
    ], UpdatePortfolioModel.prototype, "socialSharing", void 0);
    __decorate([
        (0, class_validator_1.IsEnum)(Portfolio_1.CollectionStatus),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdatePortfolioModel.prototype, "status", void 0);
    return UpdatePortfolioModel;
}(model_1.Model));
exports.UpdatePortfolioModel = UpdatePortfolioModel;
var PortfolioDesignModel = /** @class */ (function (_super) {
    __extends(PortfolioDesignModel, _super);
    function PortfolioDesignModel(body, params) {
        var _this = _super.call(this) || this;
        _this.typography = body.typography;
        _this.theme = body.theme;
        _this.x = body.x;
        _this.y = body.y;
        _this.gridStyle = body.gridStyle;
        _this.gridSpacing = body.gridSpacing;
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], PortfolioDesignModel.prototype, "typography", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Number)
    ], PortfolioDesignModel.prototype, "theme", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Number)
    ], PortfolioDesignModel.prototype, "x", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Number)
    ], PortfolioDesignModel.prototype, "y", void 0);
    __decorate([
        (0, class_validator_1.IsEnum)(collectionDesign_1.GridStyleEnum),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], PortfolioDesignModel.prototype, "gridStyle", void 0);
    __decorate([
        (0, class_validator_1.IsEnum)(collectionDesign_1.GridSpacingEnum),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], PortfolioDesignModel.prototype, "gridSpacing", void 0);
    return PortfolioDesignModel;
}(model_1.Model));
exports.PortfolioDesignModel = PortfolioDesignModel;
var FileClass = /** @class */ (function (_super) {
    __extends(FileClass, _super);
    function FileClass() {
        return _super.call(this) || this;
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], FileClass.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], FileClass.prototype, "url", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], FileClass.prototype, "key", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], FileClass.prototype, "size", void 0);
    __decorate([
        (0, class_validator_1.IsEnum)(Files_1.FileType),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], FileClass.prototype, "type", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], FileClass.prototype, "height", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], FileClass.prototype, "width", void 0);
    return FileClass;
}(model_1.Model));
var UploadFilesModel = /** @class */ (function (_super) {
    __extends(UploadFilesModel, _super);
    function UploadFilesModel(body, params) {
        var _this = _super.call(this) || this;
        var fileArr = [];
        for (var _i = 0, _a = body.files; _i < _a.length; _i++) {
            var file = _a[_i];
            var fileObj = new FileClass();
            fileObj.name = file.name;
            fileObj.size = file.size;
            fileObj.type = file.type;
            fileObj.url = file.url;
            fileObj.height = file.height;
            fileObj.width = file.width;
            fileObj.key = file.key;
            fileArr.push(fileObj);
        }
        _this.files = fileArr;
        return _this;
    }
    __decorate([
        (0, class_validator_1.ArrayMinSize)(1),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)(),
        __metadata("design:type", Array)
    ], UploadFilesModel.prototype, "files", void 0);
    return UploadFilesModel;
}(model_1.Model));
exports.UploadFilesModel = UploadFilesModel;
//# sourceMappingURL=portfolio.model.js.map