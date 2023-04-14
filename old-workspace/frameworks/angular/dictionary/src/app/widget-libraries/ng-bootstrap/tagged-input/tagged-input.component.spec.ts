import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedInputComponent } from './tagged-input.component';

describe('TaggedInputComponent', () => {
  let component: TaggedInputComponent;
  let fixture: ComponentFixture<TaggedInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
