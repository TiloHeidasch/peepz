import { TestBed } from '@angular/core/testing';

import { RandomuserService } from './randomuser.service';

describe('RandomuserService', () => {
  let service: RandomuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
