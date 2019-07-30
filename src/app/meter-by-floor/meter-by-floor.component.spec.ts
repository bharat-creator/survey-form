import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterByFloorComponent } from './meter-by-floor.component';

describe('MeterByFloorComponent', () => {
  let component: MeterByFloorComponent;
  let fixture: ComponentFixture<MeterByFloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterByFloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterByFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
