const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const referrerPolicy = require("referrer-policy");
// const https = require("https");
const mongoose = require("mongoose");
require("dotenv").config({
  path: "/Users/inbal/Documents/wedding-website/.env",
});

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return console.log("Error: ", err);
    console.log(
      "MongoDB Connection -- Ready state is:",
      mongoose.connection.readyState
    );
  }
);

app.use(cors());
app.use(referrerPolicy({ policy: "unsafe-url" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);
app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
// https.createServer(app).listen(PORT, () => {
//   console.log(`server is runing at port ${PORT}`);
// });
