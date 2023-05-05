import {TestBed, inject} from '@angular/core/testing';

import {UserService} from './user.service';
import {WelcomeComponent} from "../welcome/welcome.component";

const userServiceStub = {
  isLoggedIn: true,
  user: { name: 'Test User'}
};

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: UserService, useValue: userServiceStub}]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
