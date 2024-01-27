import { IsNumber, IsString, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RowDto {
  @IsString()
  @ApiProperty({ description: '유저 ID' })
  userId: string;

  @IsBoolean()
  @ApiProperty({ description: '동의여부' })
  isAgree: boolean;

  @IsString()
  @ApiProperty({ description: '해당 시간의 유저 잔고' })
  balance: string;

  @IsNumber()
  @ApiProperty({ description: '유저의 약관 동의/비동의 시간' })
  createdAt: number;
}

export class ResponseDto {
  @IsNumber()
  @ApiProperty({ description: 'count' })
  count: number;

  @ValidateNested({ each: true })
  @ApiProperty({ description: 'row', type: [RowDto] })
  @Type(() => RowDto)
  rows: RowDto[];
}
