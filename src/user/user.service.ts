import { Injectable } from '@nestjs/common';
import { userAgreeHistoryDtos, userBalanceHistoryDtos } from './data/user.data';
import { RequestDto } from './dto/user.request.dto';
import { ResponseDto } from './dto/user.response.dto';
import { ServiceException } from 'common/serviceException';

@Injectable()
export class UserService {
  constructor() {}

  async getUserAgreeHistory(requestDto: RequestDto): Promise<ResponseDto> {
    const { timestamp, balance, userId, limit, offset } = requestDto;

    if (!timestamp || !balance || isNaN(limit) || isNaN(offset)) {
      throw new ServiceException(400, 'Invalid input parameters');
    }

    if (!userAgreeHistoryDtos.length || !userBalanceHistoryDtos.length) {
      throw new ServiceException(
        500,
        'Data not available or in the wrong format',
      );
    }

    let userArr = [];

    if (userId) {
      userArr = userId.split(',');
    }

    // userId 중 가장 최신 데이터만 존재하도록 필터(중복 제거)
    const uniqueUsersHistory = userAgreeHistoryDtos.reduce((acc, current) => {
      // 쿼리 스트링으로 넘어온 userId가없으면 전체, 있으면 해당 user
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

    // 중복제거된 user 데이터들 중 쿼리스트링으로 넘어온 timestamp 보다 이후에 동의를 한 데이터
    const filteredUsersAgree = uniqueUsersHistory.filter(
      (item) => item.createdAt >= timestamp && item.isAgree,
    );

    const filteredUserBalance = userBalanceHistoryDtos.filter(
      (item) =>
        item.createdAt <= timestamp &&
        parseInt(item.balance) >= parseInt(balance),
    );

    const uniqueUsersBalance = filteredUserBalance.reduce((acc, current) => {
      // 쿼리 스트링으로 넘어온 userId가없으면 전체, 있으면 해당 user
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

    const rows = filteredUsersAgree
      .map((item) => {
        const userBalance = uniqueUsersBalance.find(
          (u) => u.userId === item.userId,
        );

        return userBalance
          ? {
              userId: item.userId,
              isAgree: item.isAgree,
              balance: userBalance.balance,
              createdAt: item.createdAt,
            }
          : null;
      })
      .filter((item) => item !== null);

    const modifiedRows = rows.slice(offset, offset + limit);

    const response = {
      count: modifiedRows.length,
      rows: modifiedRows,
    };

    return response;
  }
}
