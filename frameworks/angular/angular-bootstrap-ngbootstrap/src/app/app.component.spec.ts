import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {NgbModule, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let comp: AppComponent;
  let de: DebugElement;
  let el: HTMLElement;
  let input: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule.forRoot(),
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    de = fixture.debugElement;
    comp = de.componentInstance;
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    expect(comp.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    expect(el.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
