import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChildCComponent } from './my-child-c.component';

describe('MyChildCComponent', () => {
  let component: MyChildCComponent;
  let fixture: ComponentFixture<MyChildCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChildCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChildCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
