import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { Person, PersonSchema } from './types/person.schema';
import { UserModule } from '../user/user.module';
import { environment } from '../../environments/environment';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://' + environment.database + '/peepz'),
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    UserModule,
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
