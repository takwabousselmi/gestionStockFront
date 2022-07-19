import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLaboComponent } from './ajouter-labo.component';

describe('AjouterLaboComponent', () => {
  let component: AjouterLaboComponent;
  let fixture: ComponentFixture<AjouterLaboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterLaboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
