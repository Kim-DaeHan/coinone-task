import { Injectable } from '@nestjs/common';
import { userAgreeHistoryDtos, userBalanceHistoryDtos } from './data/user.data';
import { UserAgreeHistory, UserBalanceHistory } from './dto/user.dto';
// import { ServiceException } from 'common/serviceException';

@Injectable()
export class UserService {
  constructor() {}

  async getUserAgreeHistory(userId: string): Promise<UserAgreeHistory[]> {
    // 특정 사용자의 동의 이력 가져오기
    const agreeInfo = await userAgreeHistoryDtos.filter(
      (history) => history.userId === userId,
    );

    console.log('agreeInfo: ', agreeInfo);
    return agreeInfo;
  }

  async getUserBalance(userId: string): Promise<UserBalanceHistory[]> {
    // 특정 사용자의 잔액 정보 가져오기
    const balanceInfo = await userBalanceHistoryDtos.filter(
      (balance) => balance.userId === userId,
    );

    console.log('balanceInfo: ', balanceInfo);
    return balanceInfo;
  }
}
