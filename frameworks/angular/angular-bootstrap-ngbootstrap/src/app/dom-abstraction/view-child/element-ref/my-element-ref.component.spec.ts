import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyElementRefComponent } from './my-element-ref.component';

describe('MyElementRefComponent', () => {
  let component: MyElementRefComponent;
  let fixture: ComponentFixture<MyElementRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyElementRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyElementRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
