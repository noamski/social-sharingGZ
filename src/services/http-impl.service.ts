import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpImplService {

  constructor(private httpClient: HttpClient) { }

  get(url: string, params: any = {}): Observable<any> {
    return this.httpClient.get(url, params);
  }

  post(url: string, body: any) {
    return this.httpClient.post(url, body);
  }
}
