const express = require("express");
const routes = require("./routes");
const cors = require("cors");
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
