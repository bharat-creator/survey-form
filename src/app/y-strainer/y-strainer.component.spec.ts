import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YStrainerComponent } from './y-strainer.component';

describe('YStrainerComponent', () => {
  let component: YStrainerComponent;
  let fixture: ComponentFixture<YStrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YStrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YStrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
