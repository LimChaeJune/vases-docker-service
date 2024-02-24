"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("@app/services/UserService");
const tsoa_1 = require("tsoa");
let UserController = class UserController extends tsoa_1.Controller {
    updateProfile(name, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new UserService_1.UserService();
            yield service.updateUser(name, req.user.email);
            return {
                code: 'server:success',
                result: true,
            };
        });
    }
    getUsers(page, pageSize, search, searchField, sort, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new UserService_1.UserService();
            const result = yield service.getUsers(page, pageSize, search, searchField, sort, order);
            return {
                code: 'server:success',
                result: result.users,
                metadata: {
                    total: result.total,
                },
            };
        });
    }
    deleteUser(idx) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new UserService_1.UserService();
            const result = yield service.deleteUserByIndex([idx]);
            return {
                code: 'server:success',
                result: {
                    deletedCnt: result,
                },
            };
        });
    }
    deleteUsers() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Put)('/profile'),
    __param(0, (0, tsoa_1.BodyProp)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, tsoa_1.Get)('/list'),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Query)()),
    __param(5, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, tsoa_1.Delete)('/{idx}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)('user'),
    (0, tsoa_1.Tags)('User'),
    (0, tsoa_1.Response)(422, 'Validation Failed'),
    (0, tsoa_1.Response)(401, 'Unauthorized'),
    (0, tsoa_1.Response)(500, 'Unhandled')
], UserController);
//# sourceMappingURL=UserController.js.map