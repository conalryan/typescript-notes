import { TestBed, inject } from '@angular/core/testing';

import { HttpExService } from './http-ex.service';

describe('HttpExService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpExService]
    });
  });

  it('should be created', inject([HttpExService], (service: HttpExService) => {
    expect(service).toBeTruthy();
  }));
});
