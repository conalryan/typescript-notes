import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTemplateRefComponent } from './my-template-ref.component';

describe('MyTemplateRefComponent', () => {
  let component: MyTemplateRefComponent;
  let fixture: ComponentFixture<MyTemplateRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTemplateRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTemplateRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
