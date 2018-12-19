import { Request, Response, Router } from "express";
import * as uuid from "uuid";

var crypto = require("crypto")
const request = require('request')
const _ = require('lodash')
const alonRouter: Router = Router()

var domain = "balloon.cf"
var creatorKey = "c26d3a7046e4f929d3293121f10f3704"
var protocol = "https://"
var domain = "balloon.cf"
var refEndpoint = '/#/home?entry='

var tokens = {}

alonRouter.post("/", (req: Request, res: Response) => {
    // Check secret key validation
    if (req.body.key == creatorKey) {
        // Check if phone number exists
        if (!tokens[req.body.phone]) {
            var token = crypto.randomBytes(64).toString('hex');
            tokens[req.body.phone] = token;
        }

        res.send({
            url: `${protocol}${domain}${refEndpoint}${tokens[req.body.phone]}`
        })
    } else {
        res.send("Wrong key, Fuck OFF");
    }

    console.log(tokens)
    res.end();
});

// alonRouter.post("/entry", (req: Request, res: Response) => {
//     var tokenToDelete: string = req.body.token

//     var phoneNumberToDelete = (_.invert(tokens))[tokenToDelete]

//     delete tokens[phoneNumberToDelete]

//     console.log(tokens)
// })

module.exports = { 
    'tokens': tokens,
    'router': alonRouter
}
