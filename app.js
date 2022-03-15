"use strict"

const express = require("express");
const ejs = require("ejs");
const variables = require(__dirname +"/variables.js");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));















app.get("/", (req,res) => {
    res.render("index.ejs", {homeSections: variables.homeSections});
});

app.listen(process.env.PORT || 3000, (req,res) => {
    console.log("Server is running on port 3000");
});