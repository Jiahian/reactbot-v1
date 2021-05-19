const express = require("express");
//const bodyParser = require("body-parser"); //depreciated, express can do the same now
const cors = require("cors"); //new
const { SessionsClient } = require("dialogflow");
const app = express();

const config = require("./config/keys"); //require('dotenv').config()
const mongoose = require("mongoose"); //connect to mongodb database
mongoose.connect(config.mongoURI, {
  //uri is where the db is stored. the address is found in config
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

require("./models/Registration");

app.use(cors()); //middleware
app.use(express.json()); //middleware

require("./routes/dialogFlowRoutes")(app);

const PORT = process.env.PORT || 5000; //port server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
}); //start the server

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

//call router files here

const industryGroupRouter = require("./routes/industryGroupRoutes");
const careerRouter = require("./routes/careerRoutes");
const pathwayRouter = require("./routes/pathwayRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const courseRouter = require("./routes/courseRoutes");

app.use("/api/industry-track", industryGroupRouter);
app.use("/api/career", careerRouter);
app.use("/api/career-pathway", pathwayRouter);
app.use("/api/category", categoryRouter);
app.use("/api/course", courseRouter);

//Authentication & Authorisation
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
