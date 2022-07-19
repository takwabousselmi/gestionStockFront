import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutcommandeComponent } from './ajoutcommande.component';

describe('AjoutcommandeComponent', () => {
  let component: AjoutcommandeComponent;
  let fixture: ComponentFixture<AjoutcommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutcommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
