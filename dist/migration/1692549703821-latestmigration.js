'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), 'throw': verb(1), 'return': verb(2) }, typeof Symbol === 'function' && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
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
Object.defineProperty(exports, '__esModule', { value: true });
exports.latestmigration1692549703821 = void 0;
var latestmigration1692549703821 = /** @class */ (function () {
  function latestmigration1692549703821() {
    this.name = 'latestmigration1692549703821';
  }
  latestmigration1692549703821.prototype.up = function (queryRunner) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
        case 0: return [4 /*yield*/, queryRunner.query('CREATE TABLE "studioquestionnaries" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "subject" character varying NOT NULL, "message" character varying NOT NULL, "status" character varying NOT NULL DEFAULT \'AWAITING RESPONSE\', "template" jsonb NOT NULL DEFAULT \'{}\', "response" jsonb NOT NULL DEFAULT \'{}\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, "agentId" integer, CONSTRAINT "PK_4ceee81376e8c249221479186b4" PRIMARY KEY ("id"))')];
        case 1:
          _a.sent();
          return [4 /*yield*/, queryRunner.query('ALTER TABLE "studioquestionnaries" ADD CONSTRAINT "FK_63311739692d93e33db88c1f77e" FOREIGN KEY ("clientId") REFERENCES "studioclient"("id") ON DELETE CASCADE ON UPDATE NO ACTION')];
        case 2:
          _a.sent();
          return [4 /*yield*/, queryRunner.query('ALTER TABLE "studioquestionnaries" ADD CONSTRAINT "FK_33f0edf3c4c9c396f904f9ac2c7" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION')];
        case 3:
          _a.sent();
          return [2 /*return*/];
        }
      });
    });
  };
  latestmigration1692549703821.prototype.down = function (queryRunner) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
        case 0: return [4 /*yield*/, queryRunner.query('ALTER TABLE "studioquestionnaries" DROP CONSTRAINT "FK_33f0edf3c4c9c396f904f9ac2c7"')];
        case 1:
          _a.sent();
          return [4 /*yield*/, queryRunner.query('ALTER TABLE "studioquestionnaries" DROP CONSTRAINT "FK_63311739692d93e33db88c1f77e"')];
        case 2:
          _a.sent();
          return [4 /*yield*/, queryRunner.query('DROP TABLE "studioquestionnaries"')];
        case 3:
          _a.sent();
          return [2 /*return*/];
        }
      });
    });
  };
  return latestmigration1692549703821;
}());
exports.latestmigration1692549703821 = latestmigration1692549703821;
//# sourceMappingURL=1692549703821-latestmigration.js.map