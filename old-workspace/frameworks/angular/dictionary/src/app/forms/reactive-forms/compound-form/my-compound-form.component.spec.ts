import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompoundFormComponent } from './my-compound-form.component';

describe('MyCompoundFormComponent', () => {
  let component: MyCompoundFormComponent;
  let fixture: ComponentFixture<MyCompoundFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCompoundFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCompoundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
