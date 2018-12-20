import { TestBed, inject } from '@angular/core/testing';

import { ParkingServerService } from './parking-server.service';

describe('ParkingServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParkingServerService]
    });
  });

  it('should be created', inject([ParkingServerService], (service: ParkingServerService) => {
    expect(service).toBeTruthy();
  }));
});
