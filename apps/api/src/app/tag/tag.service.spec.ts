import { Test } from '@nestjs/testing';

import { TagService } from './tag.service';

describe('TagService', () => {
  let service: TagService;

  beforeAll(async () => {
    const tag = await Test.createTestingModule({
      providers: [TagService],
    }).compile();

    service = tag.get<TagService>(TagService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
