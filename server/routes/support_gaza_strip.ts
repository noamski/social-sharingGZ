import { Request, Response, Router } from "express";
import {db} from "../dal/connection";
import {User, userSchema} from "../models/User";

const supportGazaStripRouter: Router = Router();

supportGazaStripRouter.get("/map", (request: Request, response: Response) => {
  User.find({}, ((err, data) => {
    if (err) {
      response.send(err).status(400).end();
      return;
    } else {
      response.send(data).status(200).end();
      return;
    }
  }));
});

export { supportGazaStripRouter };
