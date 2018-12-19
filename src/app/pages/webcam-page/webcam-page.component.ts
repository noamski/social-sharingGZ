import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Location} from '@angular/common';

@Component({
  selector: 'app-webcam-page',
  templateUrl: './webcam-page.component.html',
  styleUrls: ['./webcam-page.component.scss'],
})

export class WebcamPageComponent implements  OnInit {

  constructor(private _location: Location) {}

  // Toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvalable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal:: 576}
  };
  public errors: WebcamInitError[] = [];
  // Latest snapshot
  public webcamImage: WebcamImage = null;
  // Webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true / false
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvalable = mediaDevices && mediaDevices.length > 1;
      });
  }
  public triggerSnapshot(): void {
    this.showWebcam = false;
    this.trigger.next();
  }

  public done(): void {
    this._location.back();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }
  public handleImage(webcamImage: WebcamImage): void {
    // console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }
  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}
