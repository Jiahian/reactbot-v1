if (process.env.NODE_ENV === "production") {
  module.exports = {
    googleProjectID: process.env.GOOGLE_PROJECT_ID,
    dialogFlowSessionID: process.env.DIALOGFLOW_SESSION_ID,
    dialogFlowSessionLanguageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: JSON.parse(process.env.GOOGLE_PRIVATE_KEY),
  };
  console.log("production environment");
  console.log(this.googleClientEmail);
  console.log(this.googleProjectID);
  console.log(this.googlePrivateKey);
} else {
  module.exports = require("./dev");
  console.log("dev environment");
}
