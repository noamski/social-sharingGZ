import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import * as environment from '../../.configenv';

import {Location} from '../app/models/Location';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class ReportService {
  private image: string = null;
  private _window: any;
  private watchPosId: number;

  public currLocation: any;
  private currAzimuth = 0;
  private whatsappSharingUrl = '';

  // report data
  private category = '11';
  private imageBase64 = '';
  private reader: any = new FileReader();

  private selectedLocation: Location = null;
  private currentLocation: Location = null;

  eventType:string = null;
  eventSize:string = null;

  private supportImage:any = null;
  private supportImageBase64:any = null;

  private commentForReport = '';

  private currentLocationSubject:BehaviorSubject<Location> = new BehaviorSubject<Location>(null);
  currentLocationObservable:Observable<Location> = this.currentLocationSubject.asObservable();

  public getAzimuth() {
    return this.currAzimuth;
  }

  public setCategory(catValue: string) {
    this.category = catValue;
  }

  public setWhatsappSharingUrl(whatsappSharingUrl: string) {
    this.whatsappSharingUrl = whatsappSharingUrl;
  }

  public getWhatsappSharingUrl() {
    return this.whatsappSharingUrl;
  }

  constructor(private http: HttpClient, private router: Router) {
    this._window = window;
    this.checkLocation();
  }

  /**
   *   Set private local variable "image", to hold the recieved image (as string)
   *   @returns {Boolean}
   */
  setImage(stringifiedImage) {
    this.image = stringifiedImage;

    return this.image == stringifiedImage;
  }

  clearImage() {
    this.image = null;
  }

  /**
   *   Return the local variable image (as string)
   *   @returns {String}
   */
  getImage() {
    return this.image;
  }


  /**
   *  Watches user location for his report
   */
  checkLocation() {
    if (navigator.geolocation) {
      this.watchPosId = navigator.geolocation.watchPosition((position) => {
        this.currLocation = position.coords;
        console.log(position.coords);
        this.setCurrentLocationCoordinates(position.coords.latitude, position.coords.longitude);
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // alert("User denied the request for Geolocation.")
            // alert("User denied the request for Geolocation.")
            // this.checkLocation()
            break;
          case error.POSITION_UNAVAILABLE:
            // alert("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            // alert("The request to get user location timed out.")
            break;
        }
      });
    }
  }

  /**
   * pauses watching user location
   */
  clearWatching() {
    navigator.geolocation.clearWatch(this.watchPosId);
  }

  /**
   *  Watches user azimuth for his report
   */
  checkAzimuth() {
    // Check if device can provide absolute orientation data
    if ('DeviceOrientationAbsoluteEvent' in window) {
      this._window.addEventListener('DeviceOrientationAbsoluteEvent', (event: any) => {
        this.deviceOrientationHandler(event);
      });
    } else if ('DeviceOrientationEvent' in window) {
      this._window.addEventListener('deviceorientation', (event: any) => {
        this.deviceOrientationHandler(event);
      });
    } else {
      alert('Sorry, try again on a compatible mobile device!');
    }
  }

  deviceOrientationHandler(event: any) {
    // Check if absolute values have been sent
    if (typeof event.webkitCompassHeading !== 'undefined') {
      this.currAzimuth = event.webkitCompassHeading; // iOS non-standard
    } else {
      this.currAzimuth = 360 - event.alpha;
      // this.isRelativeAzimuth = true
    }
  }

  upload(eventDescription:string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.checkLocation();

    const selectedLatitude = this.getCurrentLocationCoordinates().latitude;
    const selectedLongitude = this.getCurrentLocationCoordinates().longitude;

    const body = {
      'name': 'WEB-REPORTER',
      'lat': selectedLatitude ? selectedLatitude : '1',
      'lng': selectedLongitude ? selectedLongitude : '1',
      // 'imageBase64': this.getImage(), TODO: send the image to sayvu
      'imageBase64': '',
      'azimuth': this.currAzimuth,
      'description': this.getFinalCommentToSend(eventDescription, this.commentForReport),
      'category': '11', // TODO - balloon, kite, fire
      'userToken': localStorage.getItem('userToken')
    };
    let reportURL = '';
    if (process.env.NODE_ENV !== 'production') {
      reportURL = environment.config.serverBaseURL[1];
    } else {
      reportURL = environment.config.serverBaseURL[0];
    }
    console.log(reportURL);
    console.log(body);
    this.http.post(reportURL.toString() + `/api/report`, body, options).subscribe(data => {

    }, error => {
      console.error(error);
    });
  }

  captureImage(event) {
    if (event.target.files && event.target.files[0]) {
      this.reader.readAsDataURL(event.target.files[0]); // read file as data url

      this.reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.imageBase64 = event.target.result;

        // Hold the image in memory, to be used in the next state(route)
        this.setImage(this.imageBase64);

        // Move further, to next route
        this.goToCommentScreen();

        // as of now - immediately create a report to the server, description is ''
        this.upload('');
      };
    }
  }

  getFinalCommentToSend(eventDescription:string, commentForReport:string){
    const eventDescriptionTitle = "גודל איום: ";
    const commentForReportTitle = "הערות: ";
    return `${eventDescriptionTitle} ${eventDescription}\n
    ${commentForReportTitle} ${commentForReport}.`;
  }

  captureImageWithoutSending(event) {
    if (event.target.files && event.target.files[0]) {
      this.reader.readAsDataURL(event.target.files[0]); // read file as data url

      this.reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.imageBase64 = event.target.result;

        // Hold the image in memory, to be used in the next state(route)
        this.setImage(this.imageBase64);
      };
    }
  }

  goToCommentScreen() {
    this.router.navigate(['/comment']);
  }

  goToMapScreen() {
    this.router.navigate(['/map']);
  }

  setSelectedLocationCoordinates(latitude: number, longtitude: number) {
    this.selectedLocation = new Location(latitude, longtitude);
  }

  getSelectedLocationCoordinates() {
    return this.selectedLocation;
  }

  setCurrentLocationCoordinates(latitude: number, longtitude: number) {
    this.currentLocation = new Location(latitude, longtitude);
    this.currentLocationSubject.next(this.currentLocation);
  }

  getCurrentLocationCoordinates() {
    return this.currentLocation;
  }

  sendInitialReportAndMoveToMapScreen(){
    // Move further, to next route
    this.goToMapScreen();
  }

  setCommentForReport(comment){
    this.commentForReport = comment;
  }

  setEventSize(size:string){
    this.eventSize=size;
  }

  setEventType(type:string){
    this.eventType=type;
  }

  getEventSize(){
    return this.eventSize;
  }

  getEventType(){
    return this.eventType;
  }


}
