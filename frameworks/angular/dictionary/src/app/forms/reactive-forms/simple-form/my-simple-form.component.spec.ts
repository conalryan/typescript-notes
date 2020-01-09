import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySimpleFormComponent } from './my-simple-form.component';

describe('MySimpleFormComponent', () => {
  let component: MySimpleFormComponent;
  let fixture: ComponentFixture<MySimpleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySimpleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySimpleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
