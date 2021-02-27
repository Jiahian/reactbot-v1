const express = require("express");
const bodyParser = require("body-parser");
const { SessionsClient } = require("dialogflow");
const app = express();

const config = require("./config/keys");
const mongoose = require("mongoose");
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require("./models/Registration");

app.use(bodyParser.json());

require("./routes/dialogFlowRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

app.post("/api/df_text_query", async (req, res) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.text,
        languageCode: config.dialogFlowSessionLanguageCode,
      },
    },
  };

  let response = await SessionsClient.detectIntent(request);
  res.send(responses[0].queryResults);
});
