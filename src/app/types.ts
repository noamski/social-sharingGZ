export interface Coord {
  lat: number;
  lon: number;
  description?: string;
  name?: string;
}

export interface ParkingData {
  wantToShare: boolean;
  policeCarCoords: Coord;
  stationCoords: Coord;
  parkingDescription: string;
}
