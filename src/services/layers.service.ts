/**
 * Created by Noam on 09/09/2017.
 */

import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class LayersService {

  constructor(private http: Http) {
  }
 /**
   * Get Layers to place in the map.
   */
  public getLayers() {
   return new Promise((resolve, reject) => {
     this.http.post(environment.serverLayersURL + '/web/status', {
     // this.http.post(environment.serverBaseURL + '/api/layers', {
       token: environment.token,
       callcenter: environment.callcenter
     }).subscribe(data => {
       console.log(data);
       resolve(data);
     }, (err) => {
       console.error(err);
       reject(err);
     });
   });
 }

}
