import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RequestDto } from './dto/user.request.dto';
import { ResponseDto } from './dto/user.response.dto';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ServiceException } from 'common/serviceException';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('getEventParticipantsList', () => {
    it('should return event participants list', async () => {
      const requestDto: RequestDto = {
        timestamp: 1704067201,
        balance: '300000',
        userId: null,
        limit: 5,
        offset: 0,
      };

      const expectedResult: ResponseDto = {
        count: 1,
        rows: [
          {
            userId: 'USER_I',
            isAgree: true,
            balance: '608900',
            createdAt: 1704067213,
          },
        ],
      };

      jest
        .spyOn(service, 'getEventParticipantsList')
        .mockResolvedValue(expectedResult);

      const result = await controller.getEventParticipantsList(requestDto);

      expect(result).toEqual(expectedResult);
    });

    it('should handle service exceptions and throw HTTP exception', async () => {
      const requestDto: RequestDto = {
        timestamp: null,
        balance: null,
        userId: null,
        limit: null,
        offset: null,
      };

      const errorMessage = 'Test service error';
      const serviceException = new ServiceException(400, errorMessage);

      jest
        .spyOn(service, 'getEventParticipantsList')
        .mockRejectedValue(serviceException);

      await expect(
        controller.getEventParticipantsList(requestDto),
      ).rejects.toThrowError(new HttpException(errorMessage, 400));
    });

    it('should handle unexpected errors and throw internal server error', async () => {
      const requestDto: RequestDto = {
        timestamp: 1704067201,
        balance: '300000',
        userId: null,
        limit: 5,
        offset: 0,
      };

      const errorMessage = 'Unexpected error';

      jest
        .spyOn(service, 'getEventParticipantsList')
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        controller.getEventParticipantsList(requestDto),
      ).rejects.toThrowError(new InternalServerErrorException(errorMessage));
    });
  });
});
