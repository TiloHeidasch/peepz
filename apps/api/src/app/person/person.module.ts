import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { Person, PersonSchema } from './person.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://' + (process.env.mongo || '10.0.0.12') + '/peepz'
    ),
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    UserModule,
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
