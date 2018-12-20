import { Request, Response, Router } from 'express';
import { ParkingData } from '../models/ParkingData';

const stationRoute: Router = Router();

stationRoute.get('/getStations', async (req: Request, res: Response) => {
  res.send([{lat: 32.106103, lon: 34.868658, name: 'מחוז מרכז'},
    {lat: 32.106012, lon: 34.860558, name: 'מחוז צפון'}] as Station[]);
});

stationRoute.post('/station/updateData', async (req: Request, res: Response) => {
  const {parkingDescription, wantToShare, stationCoords, policeCarCoords} = req.body;

  if (!parkingDescription || !policeCarCoords || !stationCoords || wantToShare === undefined) {
    res.status(400).send('didnt send all the needed data');
    return;
  }


  let data = {};
  await ParkingData.create({
    wantToShare: wantToShare,
    policeCarCoords: policeCarCoords,
    stationCoords: stationCoords,
    parkingDescription: parkingDescription
  }).then(x => data = x);

  res.status(200).send(data);
});

export interface Station {
  lat: number;
  lon: number;
  name?: string;
}


export { stationRoute };
