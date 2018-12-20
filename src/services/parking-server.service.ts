import { Injectable } from '@angular/core';
import { HttpImplService } from './http-impl.service';
import { Observable } from 'rxjs';
import { ParkingData, Station } from '../app/types';
import * as environment from '../../.configenv';

@Injectable({
  providedIn: 'root'
})
export class ParkingServerService {

  constructor(private httpClient: HttpImplService) { }

  updateParkingData(data: ParkingData): Observable<any> {
    return this.httpClient.post('/police/station/data', data);
  }

  allStations(): Observable<any> {
    return this.httpClient.get(environment.config.serverBaseURL[1] + '/police/getStations');
  }
}
