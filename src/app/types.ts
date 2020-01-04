export interface Station {
  lat: number;
  lon: number;
  name?: string;
}

export interface ParkingData {
  wantToShare: boolean;
  policeCarCoords: Station;
  stationCoords: Station;
  parkingDescription: string;
}
