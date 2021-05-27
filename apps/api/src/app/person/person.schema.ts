import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  Characteristic as CharacteristicInterface,
  Person as PersonInterface,
  Tag,
} from 'libs/api-interfaces/src';

export class Characteristic implements CharacteristicInterface {
  id: string;
  characteristics: Characteristic[];
  name: string;
}
@Schema()
export class Person extends Document implements PersonInterface {
  @Prop()
  characteristicGroup1: Characteristic;
  @Prop()
  characteristicGroup2: Characteristic;
  @Prop()
  characteristicGroup3: Characteristic;
  @Prop()
  characteristicGroup4: Characteristic;
  @Prop()
  tags: Tag[] = [];
  @Prop()
  name?: string;
  @Prop()
  birthday?: string;
  @Prop()
  picture?: string;
  @Prop()
  lastContact?: string;
  @Prop()
  freeText?: string;
  @Prop()
  owner: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
