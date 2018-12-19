export class Report {
  latitude: number;
  longitude: number;
  event: string;

  constructor(lat, lon, event) {
    this.event = event;
    this.latitude = lat;
    this.longitude = lon;
  }
}
