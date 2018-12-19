import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-capture-page',
  templateUrl: './capture-page.component.html',
  styleUrls: ['./capture-page.component.css']
})
export class CapturePageComponent implements OnInit, OnDestroy {
  @ViewChild('video') video: any;

  public imageBase64: string = null;
  private reader: any = new FileReader();
  public description: string = ''

  constructor(private router: Router, private cd: ChangeDetectorRef, private reportSrv: ReportService) {}

  ngOnInit() {
    // this.initCamera({video: true, audio: false});
    this.initImageScreen();
  }

  initImageScreen() {
    console.log('same image on second route', this.reportSrv.getImage())
    // Get image from report service (photo taken at the previous route)
    this.imageBase64 = this.reportSrv.getImage();

    if (this.imageBase64 === null) {
      console.log('photo is blank - sry lads')
    }

  }

  ngOnDestroy() {
    if (this.video && this.video.nativeElement) {
      this.video.nativeElement.pause();
    }
  }

  goBack() {
    this.router.navigate(['/home'])

    // clear image from cache
    this.reportSrv.clearImage();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.reader.readAsDataURL(event.target.files[0]);
      this.reader.onload = (e: any) => {
        this.imageBase64 = e.target.result;
        this.cd.detectChanges();
      };
    }
  }

  goToMapScreen() {
    // this.reportSrv.upload(this.description)
    alert('דיווח נשלח בהצלחה, תודה!');
  }

  initCamera(config: any) {
    const browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.nativeElement.src = window.URL.createObjectURL(stream);
      this.video.nativeElement.play();
    });
  }
}
