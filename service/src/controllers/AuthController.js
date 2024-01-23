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
exports.AuthController = void 0;
const AuthService_1 = require("@app/services/AuthService");
const tsoa_1 = require("tsoa");
let AuthController = class AuthController extends tsoa_1.Controller {
    check(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return req.isAuthenticated();
        });
    }
    logout(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                req.logout({ keepSessionInfo: false }, (err) => {
                    if (err)
                        resolve(false);
                    else
                        resolve(true);
                });
            });
        });
    }
    login(email, pwd, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const authService = new AuthService_1.AuthService();
            const result = yield authService.login(req);
            return result;
        });
    }
    updateDataset(idx, name, type, meta) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    deleteDataset(idx) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.Get)('/check'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "check", null);
__decorate([
    (0, tsoa_1.Get)('/logout'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, tsoa_1.Post)('/login'),
    __param(0, (0, tsoa_1.BodyProp)()),
    __param(1, (0, tsoa_1.BodyProp)()),
    __param(2, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.BodyProp)()),
    __param(1, (0, tsoa_1.BodyProp)()),
    __param(2, (0, tsoa_1.BodyProp)()),
    __param(3, (0, tsoa_1.BodyProp)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateDataset", null);
__decorate([
    (0, tsoa_1.Delete)('{idx}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteDataset", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)('auth'),
    (0, tsoa_1.Tags)('Auth')
], AuthController);
//# sourceMappingURL=AuthController.js.map