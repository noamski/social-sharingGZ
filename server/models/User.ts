import {mongoose} from "../dal/connection";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  // date_of_birth: Date,
  facebook_id: String,
  name: String,
  phone_number: String,
  profile_image: String,
  user_support_images: [{
    image: String,
    lat: Number,
    lng: Number,
  }],
});
const User = mongoose.model("users", userSchema);

export {
  userSchema,
  User,
};
