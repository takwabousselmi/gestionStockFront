import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboComponent } from './labo.component';

describe('LaboComponent', () => {
  let component: LaboComponent;
  let fixture: ComponentFixture<LaboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
