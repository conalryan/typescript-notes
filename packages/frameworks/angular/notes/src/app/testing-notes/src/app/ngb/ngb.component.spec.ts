import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {DebugElement} from "@angular/core";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbComponent} from './ngb.component';
import {By} from "@angular/platform-browser";


describe('NgbComponent', () => {
  let component: NgbComponent;
  let fixture: ComponentFixture<NgbComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let input: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgbComponent],
      imports: [FormsModule, NgbModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = fixture.nativeElement;
    // To get injected services
    // Root injector: instance from TestBed (root injector)
    // let service = TestBed.get(MyService);
    // Component injector: allows us to get a dependency at the Component level.
    // let service = fixture.debugElement.injector.get(MyService);
    fixture.detectChanges();
  });

  // Object
  it('should update the text input from Dom to Comp', () => {
    fixture.whenStable().then(() => {
      input = de.query(By.css('#my-text-input')).nativeElement;
      expect(input.value).toEqual('Initial value');
      input.value = 'new user value';
      input.dispatchEvent(new Event('input'));
      expect(component.myNgbModel.myString).toBe('new user value');
    });
  });

  it('should update the text input from Comp to Dom', () => {
    component.myNgbModel.myString = 'comp updated the value';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input = de.query(By.css('#my-text-input')).nativeElement;
      expect(input.value).toEqual('comp updated the value');
      expect(input.value).toEqual(component.myNgbModel.myString);
    });
  });

  it('should update date input from Dom to Comp', () => {
    fixture.whenStable().then(() => {
      input = de.query(By.css('#my-date-input')).nativeElement;
      input.value = '2017-11-22';
      input.dispatchEvent(new Event('input'));
      expect(component.myNgbModel.myDate).toEqual({year: 2017, month: 11, day: 22});
    });
  });

  it('should update date input from Comp to Dom', () => {
    component.myNgbModel.myDate = {year: 2017, month: 11, day: 22};
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input = de.query(By.css('#my-date-input')).nativeElement;
      expect(input.value).toEqual('2017-11-22');
    });
  });
});
