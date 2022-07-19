import { TestBed } from '@angular/core/testing';

import { FournisseurserviceService } from './fournisseurservice.service';

describe('FournisseurserviceService', () => {
  let service: FournisseurserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FournisseurserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
