import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { ServiceException } from 'common/serviceException';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Find All Users' })
  @ApiOkResponse({ description: 'Find All Users', type: User, isArray: true })
  async findAll(): Promise<User[]> {
    try {
      const test = await this.userService.findAll();
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

  @Post('create')
  @ApiBody({ type: CreateUserDto, description: 'Create User' })
  @ApiOperation({ summary: 'Create User' })
  @ApiOkResponse({ description: 'Create User', type: User, isArray: false })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      if (!createUserDto || !createUserDto.address) {
        throw new BadRequestException('Invalid input');
      }
      return await this.userService.create(createUserDto);
    } catch (error) {
      console.log('error in users create: ', error.message);
      if (error.name === 'BadRequestException')
        throw new BadRequestException('Invalid input');
    }
  }
}
