import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniterechercheComponent } from './uniterecherche.component';

describe('UniterechercheComponent', () => {
  let component: UniterechercheComponent;
  let fixture: ComponentFixture<UniterechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniterechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniterechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
