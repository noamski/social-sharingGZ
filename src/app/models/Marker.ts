export class Marker{
  latitude: number;
  longitude: number;
  title: string;
  label: string;
  draggable: boolean;
  iconUrl: string;
  visible: boolean;
  openInfoWindow: boolean;
  opacity: number;
  zIndex: number;
  clickable: boolean;
  markerType:string;
  content:Object;

  constructor(){
    this.latitude = null;
    this.longitude = null;
    this.title = null;
    this.label = null;
    this.draggable = false;
    this.iconUrl = null;
    this.visible = true;
    this.openInfoWindow = true;
    this.opacity = 1;
    this.zIndex = 1;
    this.clickable = true;
    this.markerType = null;
    this.content = null;
  }
}

export function addMarkerWithIcon(latitude: number, longitude: number, iconUrl: string) {
  let marker = new Marker();
  marker.latitude = latitude;
  marker.longitude = longitude;
  marker.iconUrl = iconUrl;
  return marker;
}
