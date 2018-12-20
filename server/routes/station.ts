import { Request, Response, Router } from 'express';
import { ParkingData } from '../models/ParkingData';

const stationRoute: Router = Router();

stationRoute.post('/data', async (req: Request, res: Response) => {
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


export { stationRoute };
