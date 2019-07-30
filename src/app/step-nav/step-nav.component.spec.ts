import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepNavComponent } from './step-nav.component';

describe('StepNavComponent', () => {
  let component: StepNavComponent;
  let fixture: ComponentFixture<StepNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
