import { Request, Response, Router } from 'express';
import { ParkingData } from '../models/ParkingData';

const stationRoute: Router = Router();

stationRoute.get('/getStations', async (req: Request, res: Response) => {
  res.send([{lat: 32.107881, lon: 34.836171, name: 'תחנת משטרה ירקון'},
    {lat: 32.090075, lon: 34.775210, name: 'תחנת משטרה דיזינגוף תל אביב'},
    {lat: 32.093739, lon: 34.830863, name: 'משטרת בני ברק'}] as Station[]);
});

stationRoute.get('/availableParking', async (req: Request, res: Response) => {
  const {facebookId, stationCoord} = req.body;

  console.log("daniel taub");
  res.send({parkingData: "A5"}).status(200);
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
