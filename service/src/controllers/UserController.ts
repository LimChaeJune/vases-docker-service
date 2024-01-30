import { UserService } from '@app/services/UserService';
import { BaseResponse } from '@app/types/response';
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

@Route('user')
@Tags('User')
@Response<{ message: string; details: { [name: string]: unknown } }>(
  422,
  'Validation Failed'
)
@Response<{ message: string }>(401, 'Unauthorized')
@Response<{ message: string }>(500, 'Unhandled')
export class UserController extends Controller {
  @Put('/profile')
  public async updateProfile(
    @BodyProp() name: string,
    @Request() req: Express.Request
  ): Promise<BaseResponse<boolean, undefined>> {
    const service = new UserService();
    await service.updateUser(name, req.user.email);

    return {
      code: 'server:success',
      result: true,
    };
  }

  @Delete('/{idx}')
  public async deleteDataset(@Path() idx: number): Promise<boolean> {
    return true;
  }
}
