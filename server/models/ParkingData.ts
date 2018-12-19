import {mongoose} from "../dal/connection";
import { Schema } from 'mongoose';

const parkingSchema = new mongoose.Schema({
  wantToShare: Boolean,
  policeCarCoords: {
    lat: Number,
    lon: Number
  },
  stationCoords: {
    lat: Number,
    lon: Number
  }

});
const ParkingData = mongoose.model("parkings", parkingSchema);

export {
  parkingSchema,
  ParkingData,
};


