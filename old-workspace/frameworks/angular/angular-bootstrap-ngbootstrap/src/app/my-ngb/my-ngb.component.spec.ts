import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyNgbComponent} from './my-ngb.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

describe('NgbComponent', () => {

  let fixture: ComponentFixture<MyNgbComponent>;
  let comp: MyNgbComponent;
  let de: DebugElement;
  let el: HTMLElement;
  let input: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule.forRoot()
      ],
      declarations: [
        MyNgbComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNgbComponent);
    de = fixture.debugElement;
    comp = de.componentInstance;
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should update input', () => {
    input = de.query(By.css('#my-input')).nativeElement;
    input.value = '22';
    input.dispatchEvent(new Event('input'));
    expect(comp.myModel.myInput).toBe('22');
  });

  describe('Popover', () => {
    it('should open the popover', () => {
      /*const directive = de.query(By.directive(NgbPopover));
      directive.triggerEventHandler('click', {});
      fixture.detectChanges();
      const windowEl = fixture.nativeElement.querySelector('ngb-popover-window');
      expect(windowEl.getAttribute('role')).toBe('tooltip');
      expect(windowEl.textContent.trim()).toBe('Hello, test this popover');*/
      const button = de.query(By.css('#myPopover'));
      button.triggerEventHandler('click', {});
      fixture.detectChanges();
      const windowEl = fixture.nativeElement.querySelector('ngb-popover-window');
      expect(windowEl.getAttribute('role')).toBe('tooltip');
      expect(windowEl.textContent.trim()).toBe('Hello, test this popover');
    });

    it('should open the popover', () => {
      const button = de.query(By.css('#myPopover2'));
      button.triggerEventHandler('click', {});
      fixture.detectChanges();
      const windowEl = fixture.nativeElement.querySelector('ngb-popover-window');
      input = windowEl.querySelector('input');
      input.value = 'does it work?';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(comp.myModel.myInput).toEqual('does it work?');
    });
  });
});
