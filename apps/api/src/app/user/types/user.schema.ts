import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User as UserInterface } from 'libs/api-interfaces/src';

@Schema()
export class User extends Document implements UserInterface {
  @Prop({ unique: true })
  username: string;
  @Prop()
  password: string;
  @Prop()
  refreshToken: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
