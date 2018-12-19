import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LayersService} from '../../../services/layers.service';
import {addMarkerWithIcon, Marker} from '../../models/Marker';
import {isNullOrUndefined} from 'util';
import {ReportService} from '../../../services/report.service';
import {} from '@types/googlemaps';
import {HttpClient} from '@angular/common/http';
import {GoogleMapsAPIWrapper, LatLngLiteral} from '@agm/core';
import {findClosestMarker} from './findClosestPlace';
import {EVENT_TYPES} from '../../constants/EVENT_TYPES';
import {Subscription} from 'rxjs/internal/Subscription';
import {Location} from '../../models/Location';
import {ROLES} from '../../constants/ROLES';
import {Report} from '../../models/Report';

declare var google: any;

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})

export class MapPageComponent implements OnInit {

  currentLocation: Location = new Location (null,null);
  mapLocation: Location = new Location (null,null);
  zoom: number = 14;
  markers: Marker[] = [];
  currentLocationMarker: Marker = new Marker();
  selectedLocationMarker: Marker = new Marker();
  mapTypeId: string = 'roadmap';
  locationName:string;
  currentLocationSubscription:Subscription;
  event:Location = new Location(null,null);
  map: any;
  reports: Report[] = [new Report(32.0001, 32.333, 'bug'), new Report(32.0045, 32.333, 'mashroom'), new Report(32.0001, 32.553, 'virus'), new Report(32.0551, 32.333, 'bug')];

  EVENT_TYPE_BUTTON = EVENT_TYPES;

  eventType = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private layersService: LayersService,
              private httpClient: HttpClient,
              private wrapper: GoogleMapsAPIWrapper,
              private el: ElementRef,
  private reportService: ReportService) {
  }

  ngOnInit() {
    this.changeEventType(this.EVENT_TYPE_BUTTON.FIRE);
    this.currentLocationSubscription = this.reportService.currentLocationObservable
      .subscribe((location:Location)=>{
        if (!this.isCurrentLocationMarkerInitialized() && !isNullOrUndefined(location)) {
          this.initializeCurrentLocation(location);
        }
      });

    this.layersService.getLayers()
      .then(res => {
        const responseBody = JSON.parse(res['_body']);
        this.addStatusToMap(responseBody);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addStatusToMap(responseBody: any) {
    const reports = responseBody['reports'];
    const users = responseBody['users'];
    reports.forEach((report) => {
      let marker = addMarkerWithIcon(report.lat, report.lng, 'assets/new-design-icons/fire-savyu.png');
      marker.markerType = 'fire';
      marker.content = report;
      this.markers.push(marker);
    });

    users.forEach((user) => {
      let iconUrl = this.getIconUrlByRole(user.role);

      if(!isNullOrUndefined(iconUrl)){
        this.addNewRoleMarker(user, iconUrl);
      }
    });
  }

  private addNewRoleMarker(user, iconUrl) {
    let marker = addMarkerWithIcon(user.lat, user.lng, iconUrl);
    marker.markerType = 'troop';
    marker.content = user;
    this.markers.push(marker);
  }

  private getIconUrlByRole(role) {
    switch (role) {
      case ROLES.FIRETRUCK:
        return 'assets/new-design-icons/fire-truck-savyu.png';
      case ROLES.PATROL:
        return 'assets/new-design-icons/patrolman-savyu.png';
      default:
        return null;
    }
  }

  goToCurrentLocation() {
    const position = new google.maps.LatLng(this.currentLocation.latitude, this.currentLocation.longitude);
    this.map.panTo(position);
  }

  initializeCurrentLocation(location: Location) {
    this.currentLocation = location;
    this.currentLocationMarker = addMarkerWithIcon(this.currentLocation.latitude, this.currentLocation.longitude, 'assets/circle-16.png');
    if (!this.isSelectedLocationValid()) {
      this.setSelectedLongitude(this.currentLocation.longitude.toString());
      this.setSelectedLatitude(this.currentLocation.latitude.toString());
    }
  }

  centerMap() {
    this.zoom = 14;
  }

  goToCommentScreen() {
    this.reportService.setSelectedLocationCoordinates(this.selectedLocationMarker.latitude, this.selectedLocationMarker.longitude);
    this.router.navigate(['/comment']);
  }

  mapClicked($event: MouseEvent) {
    // this.setSelectedLocation($event['coords']['lat'], $event['coords']['lng']);
    this.getClosestPolitical();
  }



  isSelectedLocationValid() {
    return !isNullOrUndefined(this.selectedLocationMarker.latitude) && !isNullOrUndefined(this.selectedLocationMarker.longitude);
  }

  isCurrentLocationMarkerInitialized() {
    return !isNullOrUndefined(this.currentLocationMarker.latitude) && !isNullOrUndefined(this.currentLocationMarker.longitude);
  }

  setSelectedLatitude(latitude: string) {
    this.selectedLocationMarker.latitude = Number(latitude);
    if (this.isSelectedLocationValid()) {
      this.setCenterOfMapBySelectedLocation();
      this.centerMap();
      this.getClosestPolitical();
    }

  }

  setSelectedLongitude(longitude: string) {
    this.selectedLocationMarker.longitude = Number(longitude);
    if (this.isSelectedLocationValid()) {
      this.setCenterOfMapBySelectedLocation();
      this.centerMap();
      this.getClosestPolitical();
    }
  }

  setCenterOfMapBySelectedLocation() {
    this.currentLocation.latitude = this.selectedLocationMarker.latitude;
    this.currentLocation.longitude = this.selectedLocationMarker.longitude;
  }


  public loadAPIWrapper(map) {
    this.map = map;
  }

  public markerClicked = (markerObj) => {
    const position = new google.maps.LatLng(this.selectedLocationMarker.latitude, this.selectedLocationMarker.longitude);
    this.map.panTo(position);
  };

  getClosestPolitical() {
    const request = {
      location: {lat: this.selectedLocationMarker.latitude, lng: this.selectedLocationMarker.longitude},
      radius: 1000,
      type: 'political'
    };

    const service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        const place = this.filterClosestPlace(results);
        this.locationName = place.name;
      }
      if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        this.getClosestRoad();
      }
    });
  }

  getClosestRoad(){
    const roadRequest = {
      location: {lat: this.selectedLocationMarker.latitude, lng: this.selectedLocationMarker.longitude},
      radius: 5000,
      type: 'route'
    };

    const service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch(roadRequest, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        const road = this.filterClosestRoad(results);
        this.locationName = "כביש " + road.name;
      }
      if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        this.locationName = "מיקום ללא שם";
      }
    });
  }

  filterClosestRoad(results) {
    const road = findClosestMarker({lat: this.selectedLocationMarker.latitude, lng: this.selectedLocationMarker.longitude}, results);
    return road;
  }

  filterClosestPlace(results) {
    const place = findClosestMarker({lat: this.selectedLocationMarker.latitude, lng: this.selectedLocationMarker.longitude}, results);
    return place;
  }

  changeEventType(eventType) {
    this.eventType = eventType;
  }

  getMarkerIconByEventType() {
    // switch (this.eventType) {
    //   case this.EVENT_TYPE_BUTTON.BALLOON:
    //     return '/assets/new-design-assets/virus-enabled.png';
    //   case this.EVENT_TYPE_BUTTON.FIRE:
    //     return '/assets/new-design-assets/mashroom-enabled.png';
    //   case this.EVENT_TYPE_BUTTON.KITE:
    //     return '/assets/new-design-assets/bug-enabled.png';
    //   default:
    //     return '/assets/new-design-assets/bug-enabled.png';
    // }
  }

  isReportValid(){
    return this.isSelectedLocationValid() && this.eventType !== null;
  }

  completeReport(){
    this.router.navigate([`/sending-report/${this.eventType}`])
  }

}
