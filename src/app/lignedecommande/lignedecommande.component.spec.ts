import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LignedecommandeComponent } from './lignedecommande.component';

describe('LignedecommandeComponent', () => {
  let component: LignedecommandeComponent;
  let fixture: ComponentFixture<LignedecommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LignedecommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LignedecommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
