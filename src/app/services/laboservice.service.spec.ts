import { TestBed } from '@angular/core/testing';

import { LaboserviceService } from './laboservice.service';

describe('LaboserviceService', () => {
  let service: LaboserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
