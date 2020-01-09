import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

import {ExternalComponent} from './external.component';

describe('ExternalComponent', () => {
  let comp: ExternalComponent;
  let fixture: ComponentFixture<ExternalComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  /**
   * async beforeEach
   * Give Angular time to compile the external template and css
   * WebPack developers need not call .compileComponents(), it inlines templates and css as part of the automated build
   * process that precedes running the test.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalComponent], // Declare the test component.
    });
    // .compileComponents();  // Compile template and css (not necessary with webpack).
  }));

  /**
   * synchronous beforeEach
   * The compileComponents method returns a promise so you can perform additional tasks immediately after it finishes.
   * For example, you could move the synchronous code in the below beforeEach into a compileComponents().then(...)
   * callback and write only one beforeEach. However, most developers find that hard to read. The two beforeEach calls
   * are widely preferred.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalComponent);
    comp = fixture.componentInstance; // ExternalComponent test instance

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
