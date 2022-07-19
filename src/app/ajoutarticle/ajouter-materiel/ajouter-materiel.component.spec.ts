import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterMaterielComponent } from './ajouter-materiel.component';

describe('AjouterMaterielComponent', () => {
  let component: AjouterMaterielComponent;
  let fixture: ComponentFixture<AjouterMaterielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterMaterielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
