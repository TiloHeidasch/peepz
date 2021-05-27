import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PersonModule, TagModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
