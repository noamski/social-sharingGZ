import { TestBed, inject } from '@angular/core/testing';

import { HttpImplService } from './http-impl.service';

describe('HttpImplService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpImplService]
    });
  });

  it('should be created', inject([HttpImplService], (service: HttpImplService) => {
    expect(service).toBeTruthy();
  }));
});
