import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutUniteComponent } from './ajout-unite.component';

describe('AjoutUniteComponent', () => {
  let component: AjoutUniteComponent;
  let fixture: ComponentFixture<AjoutUniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutUniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
