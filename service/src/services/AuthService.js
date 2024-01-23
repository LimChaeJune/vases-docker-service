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
exports.AuthService = void 0;
const Entities_1 = require("@app/modules/datasource/Entities");
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
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
    const rows = yield user.query
        .select()
        .where({ email: email, pwd: password });
    if (rows.length > 0) {
        done(null, { email: email, type: 'local' });
    }
    else {
        done(null, false, { message: 'No User' });
    }
})));
class AuthService {
    constructor() { }
    login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                passport_1.default.authenticate('local', (err, user, info) => {
                    if (err) {
                        console.log(err);
                        resolve(false);
                    }
                    else {
                        req.logIn(user, (loginErr) => {
                            console.log(loginErr);
                            if (err)
                                resolve(false);
                            else
                                resolve(true);
                        });
                    }
                })(req);
            });
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map