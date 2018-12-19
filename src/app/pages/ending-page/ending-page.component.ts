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
$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
    current_progress += 10;
    $("#dynamic")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      .text(current_progress + "% Complete");
    if (current_progress >= 100){
      clearInterval(interval);
      $('#dynamic')
        .css('width', current_progress + '%')
        .attr('aria-valuenow', current_progress)
        .text('Contact us for solution');
    }
  }, 1000);
});
