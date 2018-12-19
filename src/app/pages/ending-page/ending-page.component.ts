import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Router } from '@angular/router'
import { ReportService } from '../../../services/report.service'

declare var $: any;

@Component({
  selector: 'app-ending-page',
  templateUrl: './ending-page.component.html',
  styleUrls: ['./ending-page.component.css']
})
export class EndingPageComponent implements OnInit, AfterViewInit {

  reportService: ReportService;
  constructor(private router: Router, private reportSrv: ReportService) {
    this.reportService = reportSrv;
  }

  ngOnInit() {
    if (this.reportService.currLocation) {
      this.reportService.clearWatching()
    } else {
      this.reportService.checkLocation()
    }
  }

  buttonClicked() {
    // activate camera
    $('input').click();
  }

  ngAfterViewInit() {

  }
}
