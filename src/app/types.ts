export interface Coord {
  lat: number;
  lon: number;
}

export interface ParkingData {
  wantToShare: boolean,
  policeCarCoords: Coord,
  stationCoords: Coord
}
