import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffoldingCivilWorkComponent } from './scaffolding-civil-work.component';

describe('ScaffoldingCivilWorkComponent', () => {
  let component: ScaffoldingCivilWorkComponent;
  let fixture: ComponentFixture<ScaffoldingCivilWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaffoldingCivilWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldingCivilWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
