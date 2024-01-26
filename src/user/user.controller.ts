import {
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserAgreeHistory, UserBalanceHistory } from './dto/user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { userAgreeHistoryDtos, userBalanceHistoryDtos } from './data/user.data';
import { ServiceException } from 'common/serviceException';

@ApiTags('user')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('agreements')
  @ApiOperation({ summary: 'Find All Users' })
  @ApiOkResponse({
    description: 'Find All Users',
    type: UserAgreeHistory,
    isArray: true,
  })
  async getUserAgreeHistory(
    @Query('userId') userId: string,
  ): Promise<UserAgreeHistory[]> {
    try {
      const test = await this.userService.getUserAgreeHistory(userId);
      return test;
    } catch (error) {
      console.log('error in users find: ', error.message);
      if (!(error instanceof ServiceException)) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new HttpException(error.message, error.errorCode);
      }
    }
  }

  @Get('agreements2')
  @ApiOperation({ summary: 'Find All Users' })
  @ApiOkResponse({
    description: 'Find All Users',
    type: UserBalanceHistory,
    isArray: true,
  })
  async getUserBalance(
    @Query('userId') userId: string,
  ): Promise<UserBalanceHistory[]> {
    try {
      const test = await this.userService.getUserBalance(userId);
      return test;
    } catch (error) {
      console.log('error in users find: ', error.message);
      if (!(error instanceof ServiceException)) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new HttpException(error.message, error.errorCode);
      }
    }
  }
}
