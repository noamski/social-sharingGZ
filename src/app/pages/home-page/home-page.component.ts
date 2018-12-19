import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ReportService } from '../../../services/report.service'
import { SupportService } from '../../../services/support.service'

declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  private reader: any = new FileReader();
  public imageBase64: string = null;
  reportService: ReportService;
  supportService: SupportService;


  constructor(private router: Router, private reportSrv: ReportService, private supportSrv: SupportService) {
    this.reportService = reportSrv;
    this.supportService = supportSrv;
    let splitString = window.location.href.split('entry=')

    if (splitString.length > 1 && ['undefined', '', null, undefined].includes(localStorage.getItem('userToken'))) {
      localStorage.setItem('userToken', splitString[1])
    }
  }

  ngOnInit() {
    this.checkToken()
    this.reportSrv.checkLocation()
    this.reportSrv.checkAzimuth()
  }
  checkToken() {
    //localStorage.setItem('token', '')
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

  moveToMapScreen(){
    this.router.navigate(['/map']);
  }
}
