const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const headlinesRouter = require("./routes/headlines");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/api/headlines", headlinesRouter);

module.exports = app;