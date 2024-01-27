import { Injectable } from '@nestjs/common';
import { userAgreeHistoryDtos, userBalanceHistoryDtos } from './data/user.data';
import { RequestDto } from './dto/user.request.dto';
import { ResponseDto } from './dto/user.response.dto';
// import { ServiceException } from 'common/serviceException';

@Injectable()
export class UserService {
  constructor() {}

  async getUserAgreeHistory(requestDto: RequestDto): Promise<ResponseDto> {
    const { timestamp, balance, userId, limit, offset } = requestDto;
    console.log('timestamp', timestamp);
    console.log('balance', balance);
    console.log('userId', userId);
    console.log('limit', limit);
    console.log('offset', offset);

    let userArr = [];

    if (userId) {
      userArr = userId.split(',');
    }

    console.log('userArr: ', userArr);

    const filteredUsers = userAgreeHistoryDtos.reduce((acc, current) => {
      if (userArr.length === 0 || userArr.includes(current.userId)) {
        const existingUser = acc.find((user) => user.userId === current.userId);

        if (!existingUser) {
          acc.push(current);
        } else if (current.createdAt > existingUser.createdAt) {
          acc = acc.filter((user) => user.userId !== current.userId);
          acc.push(current);
        }
      }

      return acc;
    }, []);

    const filteredUsersAgree = filteredUsers.filter(
      (agreement) => agreement.createdAt > timestamp && agreement.isAgree,
    );

    const result = filteredUsers.filter((agreement) => {
      const correspondingBalance = userBalanceHistoryDtos.find(
        (balance) =>
          balance.userId === agreement.userId &&
          balance.createdAt === timestamp,
      );
      return (
        correspondingBalance &&
        parseInt(correspondingBalance.balance) >= parseInt(balance)
      );
    });

    console.log('filteredUsers:', filteredUsers);
    console.log('filteredUsersAgree:', filteredUsersAgree);
    console.log('result:', result);

    const test = {
      count: 1,
      rows: [
        {
          userId: 'USER_G',
          isAgree: true,
          balance: '198800',
          createdAt: 1704067200,
        },
      ],
    };

    return test;
  }
}
