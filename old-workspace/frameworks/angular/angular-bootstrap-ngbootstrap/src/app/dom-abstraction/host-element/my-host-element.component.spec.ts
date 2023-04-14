import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHostElementComponent } from './my-host-element.component';

describe('MyHostElementComponent', () => {
  let component: MyHostElementComponent;
  let fixture: ComponentFixture<MyHostElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHostElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHostElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
