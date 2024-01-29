import {
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Logger,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseDto } from './dto/user.response.dto';
import { RequestDto } from './dto/user.request.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServiceException } from 'common/serviceException';

@ApiTags('event participant')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @Get('agreements')
  @ApiOperation({
    summary: 'Retrieve the participant list for the Coinone event',
  })
  @ApiOkResponse({
    description: 'Retrieve the participant list for the Coinone event',
    type: ResponseDto,
    isArray: true,
  })
  async getEventParticipantsList(
    // transform: true => 자동으로 타입 변환, 초기 값 정상 작동
    @Query(new ValidationPipe({ transform: true })) requestDto: RequestDto,
  ): Promise<ResponseDto> {
    try {
      this.logger.log('Entering getEventParticipantsList Controller method');
      this.logger.log(
        `Received request with query parameters: ${JSON.stringify(requestDto)}`,
      );
      const response =
        await this.userService.getEventParticipantsList(requestDto);
      return response;
    } catch (error) {
      this.logger.error(`Error in getEventParticipantsList: ${error.message}`);
      if (!(error instanceof ServiceException)) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new HttpException(error.message, error.errorCode);
      }
    } finally {
      this.logger.log('Request completed for getEventParticipantsList');
    }
  }
}
