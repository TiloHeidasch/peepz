import { Test, TestingModule } from '@nestjs/testing';

import { PersonController } from './person.controller';
import { PersonService } from './person.service';

describe('PersonController', () => {
  let person: TestingModule;

  beforeAll(async () => {
    person = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [PersonService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const appController = person.get<PersonController>(PersonController);
      expect(appController.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
