"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.AuthErrorType = void 0;
const Entities_1 = require("@app/modules/datasource/Entities");
const logger_1 = __importDefault(require("@app/modules/logger"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
var AuthErrorType;
(function (AuthErrorType) {
    AuthErrorType[AuthErrorType["noUsers"] = 1] = "noUsers";
    AuthErrorType[AuthErrorType["invalidPwd"] = 2] = "invalidPwd";
})(AuthErrorType || (exports.AuthErrorType = AuthErrorType = {}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
passport_1.default.use('local', new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'pwd',
    session: true,
    passReqToCallback: false,
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new Entities_1.UserEntity();
    const rows = yield user.query.select().where({ email: email });
    console.log(rows);
    if (rows.length > 0) {
        if (rows[0].pwd == password) {
            rows[0].pwd = '';
            done(null, rows[0]);
        }
        else {
            done(AuthErrorType.invalidPwd, false);
        }
    }
    else {
        done(AuthErrorType.noUsers, false);
    }
})));
class AuthService {
    constructor() { }
    login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                try {
                    passport_1.default.authenticate('local', (err, user, info) => {
                        console.log(err);
                        if (err) {
                            if (err == AuthErrorType.noUsers) {
                                resolve({ code: 'server:auth.no_users', result: false });
                            }
                            else if (err == AuthErrorType.invalidPwd) {
                                resolve({ code: 'server:auth.invalid_password', result: false });
                            }
                        }
                        else {
                            req.logIn(user, (loginErr) => {
                                resolve({ code: 'server:success', result: true });
                            });
                        }
                    })(req);
                }
                catch (error) {
                    logger_1.default.error('unknown error : ', error.toString());
                    resolve({ code: 'server:error', result: true });
                }
            });
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map