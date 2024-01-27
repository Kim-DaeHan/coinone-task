import {
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseDto } from './dto/user.response.dto';
import { RequestDto } from './dto/user.request.dto';
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
    type: ResponseDto,
    isArray: true,
  })
  async getUserAgreeHistory(
    // transform: true => 자동으로 타입 변환, 초기 값 정상 작동
    @Query(new ValidationPipe({ transform: true })) requestDto: RequestDto,
  ): Promise<ResponseDto> {
    try {
      const test = await this.userService.getUserAgreeHistory(requestDto);
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
