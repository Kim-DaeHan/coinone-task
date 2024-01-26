import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './test.model';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  findAll(): Promise<Test[]> {
    return this.testService.findAll();
  }
  @Get(':id')
  findOneById(@Param('id') id: string): Promise<Test> {
    return this.testService.findOneById(id);
  }
  @Get(':name')
  findOneByName(@Param('name') name: string): Promise<Test> {
    return this.testService.findOneByName(name);
  }

  @Post()
  create(@Body() createTestDto: any): Promise<Test> {
    return this.testService.create(createTestDto);
  }
}
