"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const path = require("path");
var dotenv = require("dotenv");


var urlController = require("./controllers/url.controller");

var cors = require("cors");

dotenv.config({ path: path.resolve(__dirname, "./.env") });

var app = express();
mongoose.connect(process.env.MONGO_URI);

// Basic Configuration
var port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/is-mongoose-ok", function(req, res) {
  if (mongoose) {
    res.json({ isMongooseOk: !!mongoose.connection.readyState });
  } else {
    res.json({ isMongooseOk: false });
  }
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl/new", urlController.createShortUrl);
app.get("/api/shorturl/:short", urlController.redirect);

app.listen(port, function() {
  console.log("Node.js listening ...");
});
