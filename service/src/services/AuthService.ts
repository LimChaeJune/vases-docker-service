import { UserEntity, UserSchema } from '@app/modules/datasource/Entities';
import passport from 'passport';

import { Strategy as LocalStrategy } from 'passport-local';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
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
      const rows = await user.query
        .select()
        .where({ email: email, pwd: password });
      if (rows.length > 0) {
        done(null, { email: email, type: 'local' });
      } else {
        done(null, false, { message: 'No User' });
      }
    }
  )
);

export class AuthService {
  constructor() {}

  async login(req: Express.Request): Promise<boolean> {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          req.logIn(user, (loginErr) => {
            console.log(loginErr);
            if (err) resolve(false);
            else resolve(true);
          });
        }
      })(req);
    });
  }

  async signup(
    email: string,
    pwd: string,
    name: string,
    type: string = 'local'
  ): Promise<boolean> {
    try {
      const userEntity = new UserEntity();

      await userEntity.query.insert({
        name: name,
        email: email,
        type: type,
        pwd: pwd,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getUsers(
    name: string,
    offset: number,
    limit: number
  ): Promise<UserSchema[]> {
    const userEntity = new UserEntity();

    userEntity.query.count();
    let query = userEntity.query.select();

    if (name) query = query.where('name', name);

    query = query.offset(offset);
    query = query.limit(limit);
    const result = await query;
    return result;
  }
}
