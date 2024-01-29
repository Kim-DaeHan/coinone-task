import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from 'common/http-Exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
