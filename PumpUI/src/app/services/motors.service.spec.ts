import { TestBed } from '@angular/core/testing';

import { MotorsService } from './motors.service';

describe('MotorsService', () => {
  let service: MotorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
