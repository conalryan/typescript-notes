import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyViewContainerRefComponent } from './my-view-container-ref.component';

describe('MyViewContainerRefComponent', () => {
  let component: MyViewContainerRefComponent;
  let fixture: ComponentFixture<MyViewContainerRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyViewContainerRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyViewContainerRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
