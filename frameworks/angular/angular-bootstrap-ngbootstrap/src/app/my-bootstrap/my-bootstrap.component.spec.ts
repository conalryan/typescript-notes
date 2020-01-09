import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBootstrapComponent } from './my-bootstrap.component';

describe('MyBootstrapComponent', () => {
  let component: MyBootstrapComponent;
  let fixture: ComponentFixture<MyBootstrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBootstrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
