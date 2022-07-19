import { TestBed } from '@angular/core/testing';

import { MaterielserviceService } from './materielservice.service';

describe('MaterielserviceService', () => {
  let service: MaterielserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterielserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
