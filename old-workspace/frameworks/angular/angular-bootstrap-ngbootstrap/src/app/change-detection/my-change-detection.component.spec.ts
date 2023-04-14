import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChangeDetectionComponent } from './my-change-detection.component';

describe('MyChangeDetectionComponent', () => {
  let component: MyChangeDetectionComponent;
  let fixture: ComponentFixture<MyChangeDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChangeDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChangeDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
