import { AuthService } from '@app/services/AuthService';
import { UserService } from '@app/services/UserService';
import {
  BaseResponse,
  CustomValidationError,
  UnhandledErrorResponse,
} from '@app/types/response';
import { Expose, plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  Length,
  Matches,
  validate,
} from 'class-validator';
import { Router } from 'express-ws';

import {
  Get,
  Route,
  Post,
  Tags,
  Example,
  Controller,
  Request,
  Body,
  Response,
} from 'tsoa';

export class LoginDTO {
  /**
   * @default "admin@vases.ai"
   * @format email
   */
  email: string;
  /**
   * @default "admin8282"
   * @minLength 8
   * @maxLength 50
   */
  pwd: string;
}

export class SignupDTO {
  /**
   * @format email
   */
  email: string;
  /** 풀네임 2자이상 써야데
   * @minLength 2
   * @maxLength 50
   */
  name: string;
  /**
   * @minLength 8
   * @maxLength 50
   */
  pwd: string;
  meta_json?: string;
  auto_login?: boolean;
}

@Route('auth')
@Tags('Auth')
@Response<{
  message: string;
  details: { [name: string]: { value: string; message: string } };
}>(422, 'Validation Failed')
@Response<{ message: string }>(500, 'Unhandled')
export class AuthController extends Controller {
  @Get('/check')
  public async check(
    @Request() req: Express.Request
  ): Promise<BaseResponse<boolean, Express.User>> {
    return {
      code: 'server:success',
      result: req.isAuthenticated(),
      metadata: req.user,
    };
  }

  @Get('/logout')
  public async logout(@Request() req: Express.Request) {
    return new Promise<BaseResponse<boolean, undefined>>((resolve) => {
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
  }

  @Example(
    {
      email: 'admin@vases.ai',
      pwd: 'admin8282',
    },
    'admin login sample'
  )
  @Post('/login')
  public async login(@Body() body: LoginDTO, @Request() req: Express.Request) {
    // const dto = plainToClass(LoginDTO, body);
    // const errors = await validate(dto, { skipMissingProperties: true });

    // if (errors.length > 0) throw new CustomValidationError(errors);

    const service = new AuthService();
    const result = await service.login(req);

    return result;
  }

  @Post('/signup')
  public async signup(
    @Body() body: SignupDTO,
    @Request() req: Express.Request
  ): Promise<BaseResponse<boolean, number[]>> {
    // const dto = plainToClass(SignupDTO, body);
    // const errors = await validate(dto, { skipMissingProperties: true });

    // if (errors.length > 0) throw new CustomValidationError(errors);

    const { email, pwd, name, meta_json = '', auto_login = false } = body;
    const userService = new UserService();
    const ret = await userService.addUser(email, pwd, name, meta_json);
    if (ret.code != 'server:success') {
      if (ret.code == 'server:database.duplicated') {
        return {
          code: 'server:auth.exists_email',
          result: false,
        };
      }
    }

    if (auto_login) {
      const authService = new AuthService();
      await authService.login(req);
    }

    return ret;
  }
}
