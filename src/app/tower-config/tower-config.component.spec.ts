import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerConfigComponent } from './tower-config.component';

describe('TowerConfigComponent', () => {
  let component: TowerConfigComponent;
  let fixture: ComponentFixture<TowerConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TowerConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TowerConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
