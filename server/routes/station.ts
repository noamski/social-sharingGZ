import { NextFunction, Request, Response, Router } from 'express';
import { ParkingData, parkingSchema } from '../models/ParkingData';

const stationRoute: Router = Router();

stationRoute.post('/data', async (req: Request, res: Response) => {
  let policeCarCoords = req.body.policeCarCoords;
  let stationCoords = req.body.stationCoords;
  let wantToShare = req.body.wantToShare;

  if (!policeCarCoords || !stationCoords || wantToShare === undefined) {
    res.status(400).send('didnt send all the needed data');
    return;
  }


  let data = {};
  await ParkingData.create({
    wantToShare: wantToShare,
    policeCarCoords: policeCarCoords,
    stationCoords: stationCoords
  }).then(x => data = x);

  res.status(200).send(data);
});


export { stationRoute };
