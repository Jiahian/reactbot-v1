"use strict";
const dialogflow = require("dialogflow");
const structjson = require("./structjson.js");
const config = require("../config/keys");
const mongoose = require("mongoose");

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};

const sessionClient = new dialogflow.SessionsClient({
  projectID,
  credentials,
});

//const sessionPath = sessionClient.sessionPath(projectID, sessionID);
const Registration = mongoose.model("registration");

module.exports = {
  textQuery: async function (text, userID, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID); //Create a new session
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: languageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  eventQuery: async function (event, userID, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: languageCode,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  handleAction: function (responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;

    console.log(queryResult.action);
    console.log(queryResult.allRequiredParamsPresent);

    switch (queryResult.action) {
      case "recommendcourses-yes":
        if (queryResult.allRequiredParamsPresent) {
          self.saveRegistration(queryResult.parameters.fields);
          console.log("saving registration");
        }
        break;
    }
    return responses;
  },

  saveRegistration: async function (fields) {
    const registration = new Registration({
      name: fields.name.stringValue,
      phone: fields.phone.stringValue,
      email: fields.email.stringValue,
      dateSent: Date.now(),
    });
    try {
      let reg = await registration.save();
      console.log(reg);
    } catch (err) {
      console.log(err);
    }
  },
};
