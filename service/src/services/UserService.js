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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const Entities_1 = require("@app/modules/datasource/Entities");
const better_sqlite3_1 = require("better-sqlite3");
class UserService {
    constructor() { }
    addUser(email, pwd, name, type = 'local', meta_json = '') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userEntity = new Entities_1.UserEntity();
                const ret = yield userEntity.query.insert({
                    name: name,
                    email: email,
                    type: type,
                    pwd: pwd,
                    meta_json: meta_json,
                });
                return {
                    code: 'server:success',
                    result: true,
                    metadata: ret,
                };
            }
            catch (error) {
                if (error instanceof better_sqlite3_1.SqliteError) {
                    if (error.code == 'SQLITE_CONSTRAINT_UNIQUE') {
                        return {
                            code: 'server:database.duplicated',
                            result: false,
                        };
                    }
                    else {
                        return {
                            code: 'server:database.undefined',
                            message: error.message,
                            result: false,
                        };
                    }
                }
                return {
                    code: 'server:error',
                    message: error.toString(),
                    result: false,
                };
            }
        });
    }
    updateUser(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = new Entities_1.UserEntity();
            const test = yield userEntity.query
                .where('email', email)
                .update('name', name);
            console.log(test);
            return true;
        });
    }
    // 회원 탈퇴용
    deleteUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = new Entities_1.UserEntity();
            yield userEntity.query.delete().where('email', email);
            return true;
        });
    }
    // 관리자가 회원관리시
    deleteUserByIndex(idx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = new Entities_1.UserEntity();
            const result = yield userEntity.query.delete().whereIn('idx', idx);
            return result;
        });
    }
    getUsers(page, pageSize, search, searchField, sort, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = new Entities_1.UserEntity();
            let query = userEntity.query.select();
            if (search && searchField) {
                const fields = searchField.split(',');
                fields.forEach((field) => {
                    query = query.where(field, 'like', `%${search}%`);
                });
            }
            if (sort) {
                query = query.orderBy(sort, order || 'asc');
            }
            const total = (yield query.clone().count('idx as cnt').first());
            query = query
                .limit(pageSize || 10)
                .offset(((page || 1) - 1) * (pageSize || 10));
            const result = yield query;
            return { users: result, total: total.cnt };
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map