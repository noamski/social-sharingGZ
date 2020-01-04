  import {Request, Response, Router} from "express";
import * as uuid from "uuid";
import * as environment from "../../.configenv";

const isInPolygon = require("../utils/polygonFilter").isInPolygon;
const _ = require("lodash");
const alonAPI = require("../routes/alon");
const request = require("request");
const uuidv4 = require("uuid/v4");

const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
const reportRouter: Router = Router();
reportRouter.get("/", (req: Request, res: Response) => {
  res.send("ok").end();
});

reportRouter.post("/", (req: Request, res: Response) => {
  console.log("send req to seeVU");
  console.log(req.body)
  if (req.body.lat && req.body.lng) {
    console.log("REACHED!")
    let token, userID, serverReportsURL;
    sendToDrones(req.body.lat, req.body.lng, req.body.name);

    // if (req.body.lat && req.body.lon && isInPolygon([req.body.lat, req.body.lon])) {
    let phoneNumber;
    if (req.body.userToken) {
      phoneNumber = (_.invert(alonAPI.tokens))[req.body.userToken] || "XXX-XXXXXXX";
    }
    if (process.env.NODE_ENV !== "production") {
      token = environment.config.serverLayersToken[1];
      serverReportsURL = environment.config.serverLayersURL[1];
      userID = "790";
    } else {
      token = environment.config.serverLayersToken[0];
      serverReportsURL = environment.config.serverLayersURL[0];
      userID = "1846";
    }

    // TODO remove xxx-xxxxxxxx if alon way required
    // if (phoneNumber) {
    console.log(token);
    console.log(serverReportsURL);
    const reqBody = {
      category: req.body.category ? req.body.category.toString() : "0",
      description: req.body.description,
      heading: req.body.azimuth ? req.body.azimuth.toString() : "0",
      // image: req.body.imageBase64.split("base64,")[1],
      image: "",
      lat: req.body.lat,
      lng: req.body.lng,
      name: req.body.name,
      phone: "+972504841981",
      pitch: "0",
      token,
      user_id: userID,
    };
    logger.debug(JSON.stringify(reqBody));
    request.post({
        headers: {"content-type": "application/json"},
        url: serverReportsURL + "/web/report",
        body: JSON.stringify(reqBody),
      }, (error, response, body) => {
        if (response && response.statusCode == 200) {
          console.log("ok res");
          res.send(body).status(200).end();
        } else {
          console.log(error);
          console.log(body);
          res.send("bad res").status(400).end();
        }
      },
    );

    // } else {
    //   console.log("no phone number detected");
    //   res.send("Call 107").status(200);
    //   res.end();
    // }
  } else { // If not in polygon
    res.send("עובדים על זה. תודה.").status(200).end();
  }
});

function sendToDrones(lat: string, long: string, text: string) {
  const timestamp = new Date().getTime();
  const uniqueId = uuidv4();
  const reqBody = {
    data: [{
      version: 1,
      color_index: 0,
      elevation: 0,
      latitude: parseFloat(lat),
      longitude: parseFloat(long),
      owner_id: "7b172f10-e609-4f5a-a03f-4a8e05ce9e38",
      visible_off_screen: true,
      created: timestamp,
      modified: timestamp,
      projected_fov: [],
      text,
      yaw: 0,
      unique_id: uniqueId,
      active: true,
      address: "",
      type: "tracker",
      mission_id: "aabccbbdfdfhdgfhhfdggdghdghdfhngd",
      code: "g48fe",
      owner_name: "pilot",
      pitch: 0,
      user_stopped_tracking: true,
      accuracy: 0.1,
    }]
  };
  console.log(reqBody);
  console.log("sending request to Edgybees...");
  request.post({
      headers: {"content-type": "application/json"},
      url: "https://backend.edgybees.us/10027/virtual_obj/tracker_insert/",
      body: JSON.stringify(reqBody),
    }, (error, response, body) => {
      if (response && response.statusCode == 200) {
        console.log("request to Edgybees passed successfully");
      } else {
        console.log("request to Edgybees did not pass");
      }
    },
  );
}

export {reportRouter};
