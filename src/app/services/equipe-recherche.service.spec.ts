import { TestBed } from '@angular/core/testing';

import { EquipeRechercheService } from './equipe-recherche.service';

describe('EquipeRechercheService', () => {
  let service: EquipeRechercheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipeRechercheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
