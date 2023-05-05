import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import {WelcomeComponent} from './welcome.component';
import {UserService} from '../user/user.service';
import {By} from '@angular/platform-browser';

describe('WelcomeComponent', () => {

  let comp: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let componentUserService: UserService; // the actually injected service
  let userService: UserService; // the TestBed injected service
  let de: DebugElement;  // the DebugElement with the welcome message
  let el: HTMLElement; // the DOM element with the welcome message

  let userServiceStub: {
    isLoggedIn: boolean;
    user: { name: string }
  };

  beforeEach(() => {
    // stub UserService for test purposes
    userServiceStub = {
      isLoggedIn: true,
      user: {name: 'Test User'}
    };

    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: UserService, useValue: userServiceStub}]
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    comp = fixture.componentInstance;

    // The safest way to get the injected service, the way that always works, is to get it from the injector of the
    // component-under-test.
    // UserService injected into the component (i.e. the userServiceStub in this TestBed.configureTestingModule).
    componentUserService = fixture.debugElement.injector.get(UserService);

    // You may also be able to get the service from the root injector via TestBed.get. This is easier to remember and
    // less verbose. But it only works when Angular injects the component with the service instance in the test's root
    // injector.
    // UserService from the root injector (i.e. the userServiceStub in this TestBed.configureTestingModule).
    userService = TestBed.get(UserService);

    //  get the "welcome" element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.welcome'));
    el = de.nativeElement;
  });

  it('should welcome the user', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Test User', 'expected name');
  });

  it('should welcome "Bubba"', () => {
    userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
    fixture.detectChanges();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false; // welcome message hasn't been shown yet
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });

  it('should inject the component\'s UserService instance',
    inject([UserService], (service: UserService) => {
      expect(service).toBe(componentUserService);
      expect(service).toBe(userService);
      expect(componentUserService).toBe(userService);
    }));

  it('TestBed and Component UserService should be the same', () => {
    expect(userService === componentUserService).toBe(true);
  });

  it('stub object and injected UserService should NOT be the same', () => {
    expect(userServiceStub === userService).toBe(false);

    // The userService instance injected into the component is a completely different object, a clone of the provided
    // userServiceStub.
    // Changing the stub object has no effect on the injected service
    userServiceStub.isLoggedIn = false;
    expect(userService.isLoggedIn).toBe(true);
  });
});
