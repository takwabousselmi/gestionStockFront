import { TestBed } from '@angular/core/testing';

import { LignedecommandeserviceService } from './lignedecommandeservice.service';

describe('LignedecommandeserviceService', () => {
  let service: LignedecommandeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LignedecommandeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
