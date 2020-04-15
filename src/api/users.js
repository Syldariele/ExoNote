const mysql =require("mysql");
const sqlConfig = require("../../settings").sqlConfig;
const app = require("../app.js");

app.route("/api/login")
    .get((req, res) => res.status(503).send({ status: "ERROR"}))
    .post((req, res) => {
        if (typeof req.body.email !== "string" || req.body.email === "") {
            res.status(503).send({ status: "ERROR", extra: "vous devez entrer un email"});
            return;
        }
        if (typeof req.body.password !== "string" || req.body.password === "") {
            res.status(503).send({ status: "ERROR", extra: "vous devez entrer un mot de passe"});
            return;
        }

        const sqlConnection = mysql.CreateConnection(sqlConfig);
        sqlConnection.query(
            "SELECT id, firstname, lastname, email FROM node_users WHERE email = ? AND password = ? ;",
            [req.body.email, req.body.password],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(503).send({ status: "ERROR"});
                } else {
                    console.log(result);
                    res.send({ status: "OK"});
                }
                sqlConnection.end();
            }
        )
    });