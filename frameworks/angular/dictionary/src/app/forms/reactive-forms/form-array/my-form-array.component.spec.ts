import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormArrayComponent } from './my-form-array.component';

describe('MyFormArrayComponent', () => {
  let component: MyFormArrayComponent;
  let fixture: ComponentFixture<MyFormArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFormArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
