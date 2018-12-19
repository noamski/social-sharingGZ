import {Component, OnInit} from '@angular/core';
import {request} from 'https';
import {AuthService} from '../../../services/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import {ApiMethod} from 'ngx-facebook/dist/umd/providers/facebook';
import {stringify} from 'querystring';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})


export class LoginPageComponent {

  authService: AuthService;

  constructor(private router: Router,
              private authSrv: AuthService,
              private fb: FacebookService) {
    this.authService = authSrv;

    const initParams: InitParams = {
      appId: '251457848980701',
      xfbml: true,
      version: 'v2.8'
    };

    this.fb.init(initParams);
  }

  checkLogin() {
    const that = this;
    this.fb.login()
      .then((response: LoginResponse) => {
        console.log(response);
        that.getInformationFromFB();
      }).catch((error: any) => console.error(error));
  }

  getInformationFromFB() {
    const apimethod: ApiMethod = 'get';
    this.fb.api('/me', apimethod, {fields: ['name', 'picture', 'email']})
      .then(response => {
        const userData = {
          'facebook_id': response.id,
          'name':    response.name,
          'phone_number': '',
          'profile_image': response.picture.data.url,
          'email': response.email,
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        this.authService.sendAuthReq();
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public getUser(socialPlatform: string) {


  }
}

/**
 (function (response) {
      if (response.status === 'connected') {
        // The user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire.
        localStorage.setItem('accessToken', response.authResponse.accessToken);
        FB.api('/me', { fields: ['name', 'picture', 'email'] }, function (response) {
          localStorage.setItem('name', response.name);
          localStorage.setItem('uid', response.id);
          localStorage.setItem('picture', response.picture.data.url);
          localStorage.setItem('email', response.email);
        });
      }
    })

 let token = this.authService.sendAuthReq()
 localStorage.setItem('token', token);
 this.router.navigate(['/home']);



 console.log('A');
 const apimethod: ApiMethod = 'get';
 this.fb.api('/me', apimethod, {fields: ['name', 'picture', 'email']})
 .then(response => {
        localStorage.setItem('name', response.name);
        localStorage.setItem('uid', response.id);
        localStorage.setItem('picture', response.picture.data.url);
        localStorage.setItem('email', response.email);
      })
 .catch(err => {

      });

 */
