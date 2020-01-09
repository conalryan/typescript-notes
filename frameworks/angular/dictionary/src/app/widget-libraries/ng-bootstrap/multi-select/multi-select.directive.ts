import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import {NgbTypeahead, NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {Live} from './live';
import {Observable} from 'rxjs';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

export enum Key {
  Tab = 9,
  Enter = 13,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40
}

const MULTI_SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelectDirective),
  multi: true
};

type EventReturn = () => void;

@Directive({
  selector: '[appMultiSelect]',
  exportAs: 'appMultiSelect',
  host: {
    '(blur)': 'handleBlur()',
    '[class.open]': 'isPopupOpen()',
    '(keydown)': '_overrideHandleKeyDown($event)',
    '[autocomplete]': 'autocomplete',
    'autocapitalize': 'off',
    'autocorrect': 'off',
    'role': 'combobox',
    'aria-multiline': 'false',
    '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
    '[attr.aria-activedescendant]': 'activeDescendant',
    '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
    '[attr.aria-expanded]': 'isPopupOpen()'
  },
  /**
   * Provide ValueAccessor for forms.
   * Without this [(ngModel)] will be undefined.
   */
  providers: [MULTI_SELECT_VALUE_ACCESSOR]
})
export class MultiSelectDirective extends NgbTypeahead implements OnChanges, OnDestroy {

  @Input() appMultiSelect: (text: Observable<string>) => Observable<any[]>;
  @Input() closeOnSelect = false;

  // Click event listener
  private _globalClickEvent: EventReturn;
  // Keyboard event listener
  private _globalKeyBoardEvent: EventReturn;

  constructor(
    private __elementRef: ElementRef<HTMLInputElement>,
    private __viewContainerRef: ViewContainerRef,
    private __renderer: Renderer2,
    private __injector: Injector,
    private __componentFactoryResolver: ComponentFactoryResolver,
    private __config: NgbTypeaheadConfig,
    private __ngZone: NgZone,
    private __live: Live) {

    super(__elementRef, __viewContainerRef, __renderer, __injector, __componentFactoryResolver, __config, __ngZone, __live as any);

    this.__ngZone.onStable.subscribe(() => {
      if (this.isPopupOpen()) {
        this['_windowRef'].location.nativeElement.style.top = '';
        this['_windowRef'].location.nativeElement.style.left = 0;
      }
    });

    this['_openPopup'] = this._overrideOpenPopup;
  }

  ngOnChanges() {
    this.ngbTypeahead = this.appMultiSelect;
  }

  ngOnDestroy() {
    this._setListener(false);
  }

  private _overrideOpenPopup() {
    if (!this.isPopupOpen()) {
      this['_inputValueBackup'] = this.__elementRef.nativeElement.value;
      this['_windowRef'] = this['_popupService'].open();
      this['_windowRef'].instance.id = this.popupId;
      this['_windowRef'].instance.selectEvent.subscribe((result: any) => {
        if (this.closeOnSelect) {
          this['_selectResultClosePopup'](result);
          this._setListener(false);
        } else {
          this['_selectResult'](result);
        }
      });
      this['_windowRef'].instance.activeChangeEvent.subscribe((activeId: string) => this.activeDescendant = activeId);
      if (this.container === 'body') {
        window.document.querySelector(this.container).appendChild(this['_windowRef'].location.nativeElement);
      }
      this._setListener();
    } else {
      this._setListener(false);
    }
  }

  private _setListener(attach = true): void {
    if (attach) {
      this._globalClickEvent = this.__renderer.listen('document', 'click', event => {
        this._overrideOnDocumentClick(event);
      });
      this._globalKeyBoardEvent = this.__renderer.listen('document', 'keydown', event => {
        this._documentKeyPress(event);
      });
    } else {
      if (this._globalClickEvent) {
        this._globalClickEvent();
      }
      if (this._globalKeyBoardEvent) {
        this._globalKeyBoardEvent();
      }
    }
  }

  private _overrideOnDocumentClick(event) {
    if (this['_windowRef']
      && this['_windowRef'].location.nativeElement !== event.target
      && event.target !== this.__elementRef.nativeElement
      && event.target.nodeName !== 'NGB-HIGHLIGHT'
      && !event.target.id.includes('ngb-typeahead')
      && (event.target.parentNode === 'document' || event.target.parentNode.id !== 'multi-select-container')) {
      this.dismissPopup();
      this._setListener(false);
    }
  }

  private _documentKeyPress(event: KeyboardEvent): void {
    if (this.isPopupOpen() && event.keyCode === 27) {
      this.dismissPopup();
    } else if (!this.isPopupOpen()) {
      this._globalKeyBoardEvent();
    }
  }

  private _overrideHandleKeyDown(event: KeyboardEvent) {
    if (!this.isPopupOpen()) {
      return;
    }
    if (Key[event.which]) {
      switch (event.which) {
        case Key.ArrowDown:
          event.preventDefault();
          this['_windowRef'].instance.next();
          this['_showHint']();
          break;
        case Key.ArrowUp:
          event.preventDefault();
          this['_windowRef'].instance.prev();
          this['_showHint']();
          break;
        case Key.Space:
          const result = this['_windowRef'].instance.getActive();
          if (result) {
            event.preventDefault();
            event.stopPropagation();
            this['_selectResult'](result);
          }
          break;
        case Key.Tab:
        case Key.Escape:
          event.preventDefault();
          this['_resubscribeTypeahead'].next(null);
          this.dismissPopup();
          this._setListener(false);
          break;
      }
    }
  }
}
