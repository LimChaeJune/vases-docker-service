import { BaseResponse } from '@app/types/response';
import { UserEntity } from '@vases/datasource';
import { logger } from '@vases/logger';
import passport from 'passport';

import { Strategy as LocalStrategy } from 'passport-local';

export enum AuthErrorType {
  noUsers = 1,
  invalidPwd = 2,
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pwd',
      session: true,
      passReqToCallback: false,
    },
    async (email, password, done) => {
      const user = new UserEntity();
      const rows = await user.query.select().where({ email: email });
      console.log(rows);
      if (rows.length > 0) {
        if (rows[0].pwd == password) {
          rows[0].pwd = '';
          done(null, rows[0]);
        } else {
          done(AuthErrorType.invalidPwd, false);
        }
      } else {
        done(AuthErrorType.noUsers, false);
      }
    }
  )
);

export class AuthService {
  constructor() {}

  async login(req: Express.Request) {
    return new Promise<BaseResponse<boolean, undefined>>((resolve) => {
      try {
        passport.authenticate('local', (err: any, user: any, info: any) => {
          console.log(err);
          if (err) {
            if (err == AuthErrorType.noUsers) {
              resolve({ code: 'server:auth.no_users', result: false });
            } else if (err == AuthErrorType.invalidPwd) {
              resolve({ code: 'server:auth.invalid_password', result: false });
            }
          } else {
            req.logIn(user, (loginErr) => {
              resolve({ code: 'server:success', result: true });
            });
          }
        })(req);
      } catch (error: any) {
        logger.error('unknown error : ', error.toString());
        resolve({ code: 'server:error', result: true });
      }
    });
  }
}
