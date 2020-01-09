import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySimpleChangesComponent } from './my-simple-changes.component';

describe('MySimpleChangesComponent', () => {
  let component: MySimpleChangesComponent;
  let fixture: ComponentFixture<MySimpleChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySimpleChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySimpleChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
