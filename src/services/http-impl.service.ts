import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpImplService {

  constructor(private httpClient: HttpClient) { }

  get(url: string) {
    return this.httpClient.get(url);
  }

  post(url: string, body: any) {
    return this.httpClient.post(url, body);
  }
}
