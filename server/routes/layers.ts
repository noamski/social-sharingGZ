import { Request, Response, Router } from "express";
import * as uuid from "uuid";
import { json } from "body-parser";

const crypto = require("crypto");
const fs = require("fs");

const layerRouter: Router = Router();

const creatorKey = "c26d3a7046e4f929d3293121f10f3704";
const protocol = "https://";
const domain = "balloon.cf";
const refEndpoint = "/#/home?entry=";

const tokens = {};

var statusReport = {
    "reports": [
      {
        "id": 123,
        "lat": 32.333,
        "lng": 31.333,
        "name": "Israel Israeli",
        "phone": "+97255555555",
        "timestamp": 1531821361123
      },
      {
        "id": 124,
        "lat": 31.333,
        "lng": 32.333,
        "name": "Dodo Israeli",
        "phone": "+97266666666",
        "timestamp": 1531821361624
      }
    ],
    "users": [
      {
        "lat": 32.3332,
        "lng": 31.333,
        "name": "Israel Israeli",
        "phone": "+97255555555",
        "timestamp": 1531821361123
      },
      {
        "lat": 31.3331,
        "lng": 32.333,
        "name": "Israela Israeli",
        "phone": "+97266666666",
        "timestamp": 1531821361624
      }
    ]
}

layerRouter.post('/', (request: Request, response: Response) => {

    response.json(statusReport);
})

export { layerRouter };
