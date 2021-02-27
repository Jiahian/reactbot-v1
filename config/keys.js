if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
  console.log("production environment");

  console.log(this.googleProjectID);
  console.log(this.googlePrivateKey);
} else {
  module.exports = require("./dev");
  console.log("dev environment");
}
