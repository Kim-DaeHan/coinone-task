import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'user' })
export class User extends Document {
  @Prop({ unique: true })
  @ApiProperty({ description: '유저 주소' })
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('find', function () {
  console.log('user find');
});
