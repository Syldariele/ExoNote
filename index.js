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
    .post((req, res) => {
        console.log(req.body);

    const sqlConnection = mysql.createConnection(sqlConfig);

    sqlConnection.query(
        "INSERT INTO node_articles VALUES (NULL, ?, ?, ?, ?)",
                [req.body.title, req.body.content, req.body.author, req.body.create_date],
        (error, result) => {
            if (error) {
                console.log("ERROR :", error.code);
                res.status(503).send({ status: "ERROR"});
            } else {
                console.log(result);
                res.send({ status: "OK" });
            }
            sqlConnection.end();
        }
    );
});

        app.route("/api/articles/delete")
    .get((req, res) => res.status (503).send({ status: "ERROR"}));

