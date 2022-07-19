import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutligneComponent } from './ajoutligne.component';

describe('AjoutligneComponent', () => {
  let component: AjoutligneComponent;
  let fixture: ComponentFixture<AjoutligneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutligneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutligneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
