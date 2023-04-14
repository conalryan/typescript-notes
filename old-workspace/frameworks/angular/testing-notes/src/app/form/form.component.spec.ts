import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {FormComponent} from './form.component';

describe('FormComponent', () => {
  let comp: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let input: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display original title', () => {
    el = de.query(By.css('h1')).nativeElement;
    expect(el.textContent).toContain(comp.title);
  });

  it('should display a different test title', () => {
    comp.title = 'Test Title';
    fixture.detectChanges();
    el = de.query(By.css('h1')).nativeElement;
    expect(el.textContent).toContain('Test Title');
  });

  // Object
  it('should update the input from Dom to Comp', () => {
    fixture.whenStable().then(() => {
      input = de.query(By.css('#my-input')).nativeElement;
      expect(input.value).toEqual('Initial value');
      input.value = 'new user value';
      input.dispatchEvent(new Event('input'));
      expect(comp.myObject.myString).toBe('new user value');
    });
  });

  it('should update the input from Comp to Dom', () => {
    comp.myObject.myString = 'comp updated the value';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input = de.query(By.css('#my-input')).nativeElement;
      expect(input.value).toEqual('comp updated the value');
      expect(input.value).toEqual(comp.myObject.myString);
    });
  });

  // Array
  it('should update the input of array from Dom to Comp', () => {
    fixture.whenStable().then(() => {
      input = de.query(By.css('#my-input-or-array')).nativeElement;
      expect(input.value).toEqual('Initial value');
      input.value = 'new user value';
      input.dispatchEvent(new Event('input'));
      expect(comp.myArray[0].myString).toBe('new user value');
    });
  });

  it('should update the input of array from Comp to Dom', () => {
    comp.myArray[0].myString = 'comp updated the value';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input = de.query(By.css('#my-input-or-array')).nativeElement;
      expect(input.value).toEqual('comp updated the value');
      expect(input.value).toEqual(comp.myArray[0].myString);
    });
  });
});
