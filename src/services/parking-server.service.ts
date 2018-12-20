import { Injectable } from '@angular/core';
import { HttpImplService } from './http-impl.service';
import { Observable } from 'rxjs';
import { ParkingData } from '../app/types';

@Injectable({
  providedIn: 'root'
})
export class ParkingServerService {

  constructor(private httpClient: HttpImplService) { }

  updateParkingData(data: ParkingData): Observable<any> {
    return this.httpClient.post('/police/station/data', data);
  }
}
