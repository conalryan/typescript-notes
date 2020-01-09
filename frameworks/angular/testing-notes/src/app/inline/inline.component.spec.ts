import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

import {InlineComponent} from './inline.component';

describe('InlineComponent', () => {

  let comp: InlineComponent;
  let fixture: ComponentFixture<InlineComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {

    /*
     * Configure the testing module to replace the component's module:
     * - TestBed.configureTestingModule({...}) method takes an @NgModule-like metadata object.
     * - The metadata object can have most of the properties of a normal NgModule.
     * - Call configureTestingModule within a beforeEach so that TestBed can reset itself to a base state before each test runs.
     */
    TestBed.configureTestingModule({
      declarations: [InlineComponent], // declare the test component
    });

    fixture = TestBed.createComponent(InlineComponent);
    comp = fixture.componentInstance; // InlineComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('no title in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.title);
  });

  it('should display a different test title', () => {
    comp.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });
});
