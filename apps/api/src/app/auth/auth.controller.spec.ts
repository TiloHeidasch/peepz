import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let auth: TestingModule;

  beforeAll(async () => {
    auth = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const appController = auth.get<AuthController>(AuthController);
      expect(appController.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
