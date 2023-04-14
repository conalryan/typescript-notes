import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChildAComponent } from './my-child-a.component';

describe('MyChildAComponent', () => {
  let component: MyChildAComponent;
  let fixture: ComponentFixture<MyChildAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChildAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChildAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
