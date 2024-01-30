import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { RequestDto } from './dto/user.request.dto';
import { ServiceException } from 'common/serviceException';
import { ResponseDto } from './dto/user.response.dto';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

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

      const result = await service.getEventParticipantsList(requestDto);

      expect(result).toBeDefined();
      expect(result.count).toBe(expectedResult.count);
      expect(result.rows).toBeDefined();
      expect(result.rows.length).toBe(expectedResult.rows.length);

      expect(result).toEqual(expectedResult);
    });

    it('should handle invalid input parameters', async () => {
      const requestDto: RequestDto = {
        timestamp: null,
        balance: null,
        userId: null,
        limit: null,
        offset: null,
      };

      await expect(
        service.getEventParticipantsList(requestDto),
      ).rejects.toThrowError(ServiceException);
    });
  });
});
