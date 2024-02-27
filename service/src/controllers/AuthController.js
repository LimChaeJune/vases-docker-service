'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthController = exports.SignupDTO = exports.LoginDTO = void 0;
const AuthService_1 = require('@app/services/AuthService');
const UserService_1 = require('@app/services/UserService');
const tsoa_1 = require('tsoa');
class LoginDTO {}
exports.LoginDTO = LoginDTO;
class SignupDTO {}
exports.SignupDTO = SignupDTO;
let AuthController = class AuthController extends tsoa_1.Controller {
  check(req) {
    return __awaiter(this, void 0, void 0, function* () {
      return {
        code: 'server:success',
        result: req.isAuthenticated(),
        metadata: req.user,
      };
    });
  }
  logout(req) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve) => {
        req.logout({ keepSessionInfo: false }, (err) => {
          if (err)
            resolve({
              code: 'server:error',
              result: false,
            });
          else
            resolve({
              code: 'server:success',
              result: true,
            });
        });
      });
    });
  }
  login(body, req) {
    return __awaiter(this, void 0, void 0, function* () {
      // const dto = plainToClass(LoginDTO, body);
      // const errors = await validate(dto, { skipMissingProperties: true });
      // if (errors.length > 0) throw new CustomValidationError(errors);
      const service = new AuthService_1.AuthService();
      const result = yield service.login(req);
      return result;
    });
  }
  signup(body, req) {
    return __awaiter(this, void 0, void 0, function* () {
      // const dto = plainToClass(SignupDTO, body);
      // const errors = await validate(dto, { skipMissingProperties: true });
      // if (errors.length > 0) throw new CustomValidationError(errors);
      const { email, pwd, name, meta_json = '', auto_login = false } = body;
      const userService = new UserService_1.UserService();
      const ret = yield userService.addUser(email, pwd, name, meta_json);
      if (ret.code != 'server:success') {
        if (ret.code == 'server:database.duplicated') {
          return {
            code: 'server:auth.exists_email',
            result: false,
          };
        }
      }
      if (auto_login) {
        const authService = new AuthService_1.AuthService();
        yield authService.login(req);
      }
      return ret;
    });
  }
};
exports.AuthController = AuthController;
__decorate(
  [
    (0, tsoa_1.Get)('/check'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'check',
  null
);
__decorate(
  [
    (0, tsoa_1.Get)('/logout'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'logout',
  null
);
__decorate(
  [
    (0, tsoa_1.Example)(
      {
        email: 'admin@vases.ai',
        pwd: 'admin8282',
      },
      'admin login sample'
    ),
    (0, tsoa_1.Post)('/login'),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [LoginDTO, Object]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'login',
  null
);
__decorate(
  [
    (0, tsoa_1.Post)('/signup'),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [SignupDTO, Object]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'signup',
  null
);
exports.AuthController = AuthController = __decorate(
  [
    (0, tsoa_1.Route)('auth'),
    (0, tsoa_1.Tags)('Auth'),
    (0, tsoa_1.Response)(422, 'Validation Failed'),
    (0, tsoa_1.Response)(500, 'Unhandled'),
  ],
  AuthController
);
//# sourceMappingURL=AuthController.js.map
