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
exports.CreateStudioClientModel = void 0;
var class_validator_1 = require("class-validator");
var model_1 = require("../../helpers/model");
var CreateStudioClientModel = /** @class */ (function (_super) {
    __extends(CreateStudioClientModel, _super);
    function CreateStudioClientModel(body, params) {
        var _this = _super.call(this) || this;
        _this.name = body.name;
        _this.email = body.email;
        _this.phone = body.phone;
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
    return CreateStudioClientModel;
}(model_1.Model));
exports.CreateStudioClientModel = CreateStudioClientModel;
//# sourceMappingURL=studioManagement.model.js.map