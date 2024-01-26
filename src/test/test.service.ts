import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from './test.model';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name) private readonly testModel: Model<Test>,
  ) {}

  async findAll(): Promise<Test[]> {
    // 모든 데이터 조회
    return this.testModel.find().exec();
  }

  async findOneById(id: string): Promise<Test> {
    // ID를 기반으로 데이터 조회
    return this.testModel.findById(id).exec();
  }

  async findOneByName(name: string): Promise<Test> {
    // 이름을 기반으로 데이터 조회
    return this.testModel.findOne({ name }).exec();
  }

  async create(createTestDto: any): Promise<Test> {
    const createdTest = new this.testModel(createTestDto);
    return createdTest.save();
  }
}
