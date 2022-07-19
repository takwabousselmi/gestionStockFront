import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEquiepeRechComponent } from './list-equiepe-rech.component';

describe('ListEquiepeRechComponent', () => {
  let component: ListEquiepeRechComponent;
  let fixture: ComponentFixture<ListEquiepeRechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEquiepeRechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEquiepeRechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
