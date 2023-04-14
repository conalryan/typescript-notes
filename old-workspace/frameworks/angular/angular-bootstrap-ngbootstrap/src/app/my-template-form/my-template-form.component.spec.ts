import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTemplateFormComponent } from './my-template-form.component';

describe('MyTemplateFormComponent', () => {
  let component: MyTemplateFormComponent;
  let fixture: ComponentFixture<MyTemplateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTemplateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
