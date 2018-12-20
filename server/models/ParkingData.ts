import {mongoose} from "../dal/connection";

const parkingSchema = new mongoose.Schema({
  wantToShare: Boolean,
  policeCarCoords: {
    lat: Number,
    lon: Number
  },
  stationCoords: {
    lat: Number,
    lon: Number
  },
  parkingDescription: String

});
const ParkingData = mongoose.model("parkings", parkingSchema);

export {
  parkingSchema,
  ParkingData,
};


