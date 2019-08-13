import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSupplyComponent } from './common-supply.component';

describe('CommonSupplyComponent', () => {
  let component: CommonSupplyComponent;
  let fixture: ComponentFixture<CommonSupplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonSupplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
