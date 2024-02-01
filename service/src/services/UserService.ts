import { UserEntity, UserSchema } from '@app/modules/datasource/Entities';
import logger from '@app/modules/logger';
import { BaseResponse } from '@app/types/response';
import { SqliteError } from 'better-sqlite3';
import passport from 'passport';

export class UserService {
  constructor() {}

  async addUser(
    email: string,
    pwd: string,
    name: string,
    type: string = 'local',
    meta_json: string = ''
  ): Promise<BaseResponse<boolean, number[]>> {
    try {
      const userEntity = new UserEntity();

      const ret = await userEntity.query.insert({
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
    } catch (error) {
      if (error instanceof SqliteError) {
        if (error.code == 'SQLITE_CONSTRAINT_UNIQUE') {
          return {
            code: 'server:database.duplicated',
            result: false,
          };
        } else {
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
  }

  async updateUser(name: string, email: string): Promise<boolean> {
    const userEntity = new UserEntity();
    const test = await userEntity.query
      .where('email', email)
      .update('name', name);
    console.log(test);
    return true;
  }

  // 회원 탈퇴용
  async deleteUserByEmail(email: string): Promise<boolean> {
    const userEntity = new UserEntity();
    const aa = userEntity.query.delete().where('email', email);
    return true;
  }

  // 관리자가 회원관리시
  async deleteUserByIndex(idx: number[]): Promise<number> {
    const userEntity = new UserEntity();
    const result = await userEntity.query.delete().whereIn('idx', idx);
    return result;
  }

  async getUsers(
    offset: number,
    limit: number,
    name?: string,
    email?: string
  ): Promise<{ users: UserSchema[]; total: number }> {
    const userEntity = new UserEntity();

    let query = userEntity.query.select();

    if (name) query = query.where('name', name);
    if (email) query = query.andWhere('email', email);

    const total = (await query.clone().count('idx as cnt').first()) as any;

    console.log(total);

    query = query.offset(offset);
    query = query.limit(limit);
    const result = await query;
    return { users: result, total: total.cnt };
  }
}