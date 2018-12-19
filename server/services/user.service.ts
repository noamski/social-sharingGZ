import {User} from "../models/User";

export function getOnlineUsers(request, response) {
  return new Promise((resolve, reject) => {
      User.find({}, (err, users) => {
        resolve(users);
      }, (err) => {
        reject(err);
      });
    });
}
