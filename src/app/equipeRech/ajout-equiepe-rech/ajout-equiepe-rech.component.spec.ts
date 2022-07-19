import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEquiepeRechComponent } from './ajout-equiepe-rech.component';

describe('AjoutEquiepeRechComponent', () => {
  let component: AjoutEquiepeRechComponent;
  let fixture: ComponentFixture<AjoutEquiepeRechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutEquiepeRechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutEquiepeRechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
