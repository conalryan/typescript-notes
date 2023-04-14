import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpExComponent } from './http-ex.component';

describe('HttpExComponent', () => {
  let component: HttpExComponent;
  let fixture: ComponentFixture<HttpExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
