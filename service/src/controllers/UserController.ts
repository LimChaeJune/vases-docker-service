import { UserSchema } from '@app/modules/datasource/Entities';
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
@Response<{
  message: string;
  details: { [name: string]: { value: string; message: string } };
}>(422, 'Validation Failed')
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

  @Get('/list')
  public async getUsers(
    @Query() offset: number,
    @Query() limit: number
  ): Promise<BaseResponse<UserSchema[], { total: number }>> {
    const service = new UserService();

    const result = await service.getUsers(offset, limit);

    return {
      code: 'server:success',
      result: result.users,
      metadata: {
        total: result.total,
      },
    };
  }

  @Delete('/{idx}')
  public async deleteUser(
    @Path() idx: number
  ): Promise<BaseResponse<{ deletedCnt: number }, undefined>> {
    const service = new UserService();
    const result = await service.deleteUserByIndex([idx]);
    return {
      code: 'server:success',
      result: {
        deletedCnt: result,
      },
    };
  }

  public async deleteUsers() {}
}