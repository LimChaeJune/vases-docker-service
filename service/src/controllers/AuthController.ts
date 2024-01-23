import { AuthService } from '@app/services/AuthService';
import passport from 'passport';
import {
  Get,
  Route,
  Post,
  Delete,
  Tags,
  Query,
  BodyProp,
  Example,
  Path,
  Put,
  Controller,
  Request,
  Response,
  SuccessResponse,
} from 'tsoa';

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  @Get('/check')
  public async check(@Request() req: Express.Request): Promise<boolean> {
    return req.isAuthenticated();
  }

  @Get('/logout')
  public async logout(@Request() req: Express.Request): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      req.logout({ keepSessionInfo: false }, (err) => {
        if (err) resolve(false);
        else resolve(true);
      });
    });
  }
  @Post('/login')
  public async login(
    @BodyProp() email: string,
    @BodyProp() pwd: string,
    @Request() req: Express.Request
  ): Promise<boolean> {
    const authService = new AuthService();
    const result = await authService.login(req);

    return result;
  }

  @Put()
  public async updateDataset(
    @BodyProp() idx: number,
    @BodyProp() name: string,
    @BodyProp() type: string,
    @BodyProp() meta: string
  ): Promise<boolean> {
    return true;
  }

  @Delete('{idx}')
  public async deleteDataset(@Path() idx: number): Promise<boolean> {
    return true;
  }
}
