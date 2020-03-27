const express = require("express");
const mysql = require("mysql");
const settings = require("./settings.json");

const sqlConfig = settings.sqlConfig;
const app = express();

app.listen(3000, () => {
    console.log("SERVEUR STARTED !");
});



app.route("/api/articles/create")
    .get((req, res) => res.status(503).send({ status: "ERROR"}));

