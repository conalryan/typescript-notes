import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChildBComponent } from './my-child-b.component';

describe('MyChildBComponent', () => {
  let component: MyChildBComponent;
  let fixture: ComponentFixture<MyChildBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChildBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChildBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
