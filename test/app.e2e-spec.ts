import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ResponseDto } from 'src/user/dto/user.response.dto';
import { RequestDto } from 'src/user/dto/user.request.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/agreements (GET)', () => {
    const queryParameters: RequestDto = {
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

    return request(app.getHttpServer())
      .get('/user/agreements')
      .query(queryParameters)
      .expect(200)
      .expect((response) => {
        expect(response.body).toBeDefined();
        expect(response.body).toEqual(expectedResult);
      });
  });
});
