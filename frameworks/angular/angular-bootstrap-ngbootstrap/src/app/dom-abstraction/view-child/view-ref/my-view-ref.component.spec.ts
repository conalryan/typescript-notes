import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyViewRefComponent } from './my-view-ref.component';

describe('MyViewRefComponent', () => {
  let component: MyViewRefComponent;
  let fixture: ComponentFixture<MyViewRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyViewRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyViewRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
