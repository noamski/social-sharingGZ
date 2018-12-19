import { Component, OnInit } from '@angular/core';
import * as environment from '../../../../.configenv';
import {HttpClient, HttpHeaders} from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-userlist-page',
  templateUrl: './userlist-page.component.html',
  styleUrls: ['./userlist-page.component.scss']
})

export class UserlistPageComponent implements OnInit {
  users;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getOnlineFacebookFriends();
  }

  getOnlineFacebookFriends() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    let reportURL = '';
    if (process.env.NODE_ENV !== 'production') {
      reportURL = environment.config.serverBaseURL[1];
    } else {
      reportURL = environment.config.serverBaseURL[0];
    }
    this.http.post(reportURL.toString() + `/api/users/online`, {}, options).subscribe(data => {
      console.log(data);
      this.users = data;
      }, error => {
      console.error(error);
    });
  }

}
