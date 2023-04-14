import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLifecycleHooksComponent } from './my-lifecycle-hooks.component';

describe('MyLifecycleHooksComponent', () => {
  let component: MyLifecycleHooksComponent;
  let fixture: ComponentFixture<MyLifecycleHooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLifecycleHooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLifecycleHooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
