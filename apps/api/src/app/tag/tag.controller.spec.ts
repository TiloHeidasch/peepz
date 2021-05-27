import { Test, TestingModule } from '@nestjs/testing';

import { TagController } from './tag.controller';
import { TagService } from './tag.service';

describe('TagController', () => {
  let tag: TestingModule;

  beforeAll(async () => {
    tag = await Test.createTestingModule({
      controllers: [TagController],
      providers: [TagService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const appController = tag.get<TagController>(TagController);
      expect(appController.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
