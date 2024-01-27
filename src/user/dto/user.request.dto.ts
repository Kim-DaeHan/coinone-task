import { IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RequestDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: '조회 기준 시간', required: false })
  timestamp: number = Date.now(); // default: 현재 timestamp

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '조회 기준 잔액', required: false })
  balance: string = '0'; // default: "0"

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '유저 ID', required: false })
  userId: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ description: '조회 내역 수 제한', required: false })
  limit: number = 5; // default: 5

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({ description: '건너뛸 내역 수 제한', required: false })
  offset: number = 0; // default: 0
}
