import { TestBed } from '@angular/core/testing';

import { UniterechercheserviceService } from './uniterechercheservice.service';

describe('UniterechercheserviceService', () => {
  let service: UniterechercheserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniterechercheserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
