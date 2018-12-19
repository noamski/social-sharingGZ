import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ReportService } from '../../../services/report.service'
import { SupportService } from '../../../services/support.service'
import {AuthService} from '../../../services/auth.service';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import {ApiMethod} from 'ngx-facebook/dist/umd/providers/facebook';

declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {
  authService: AuthService;
  private reader: any = new FileReader();
  public imageBase64: string = null;
  reportService: ReportService;
  supportService: SupportService;
  constructor(private router: Router,
              private authSrv: AuthService,
              private fb: FacebookService,
              private reportSrv: ReportService,
              private supportSrv: SupportService) {
    this.authService = authSrv;
    this.reportService = reportSrv;
    this.supportService = supportSrv;

    const splitString = window.location.href.split('entry=')

    if (splitString.length > 1 && ['undefined', '', null, undefined].includes(localStorage.getItem('userToken'))) {
      localStorage.setItem('userToken', splitString[1]);
    }
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
        this.router.navigate(['/map']);
      })
      .catch(err => {
        console.log(err);
      });
  }
  ngOnInit() {
    this.checkToken();
    this.reportSrv.checkLocation();
    this.reportSrv.checkAzimuth();
  }
  checkToken() {
    // localStorage.setItem('token', '')
    // if (['undefined', '', null, undefined].includes(localStorage.getItem('token'))) {
    //   console.log('no token go to login')
    //   this.router.navigate(['/login']);
    // } else {
      this.router.navigate(['/home']);
    // }
  }
  // Handle loading screen div and homepage, in such a way
  // that simulates a real loading screen
  ngAfterViewInit() {
  }

  goToCommentScreen() {
    this.router.navigate(['/comment']);
  }

  buttonClicked() {
    // activate camera
    $('#file').click();
  }
  supportButtonClicked() {
    // activate camera
    $('#supportfile').click();
  }

  moveToMapScreen() {
    this.router.navigate(['/map']);
  }
}
