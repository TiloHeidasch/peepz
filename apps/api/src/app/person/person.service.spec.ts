import { Test } from '@nestjs/testing';

import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;

  beforeAll(async () => {
    const person = await Test.createTestingModule({
      providers: [PersonService],
    }).compile();

    service = person.get<PersonService>(PersonService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
