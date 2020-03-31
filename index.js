const express = require("express");
const mysql = require("mysql");
const settings = require("./settings.json");

const sqlConfig = settings.sqlConfig;
const app = express();

app.listen(3000, () => {
    console.log("SERVEUR STARTED !");
});

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true}));

app.get("/api/articles", (req, res) => {
    const sqlConnection = mysql.createConnection(sqlConfig);

    sqlConnection.query(
        "SELECT id, title, content, author, created_at FROM node_articles ORDER BY id DESC LIMIT 5", /* pour author on fait une jointure : author.firstname AS authorFirstname,
        author.lastname AS authorLastname, created_at (on ferme les "" et met + "  FROM....." */
        /* pour le ORDER BY on ne le fait pas par l'id mais par le created_at */
        /* pour le reste voir la correction github......*/
        (error, result) => {
            if (error) {
                console.log("ERROR :", error.code);
            } else {
                res.send(result);
            }
            sqlConnection.end();
        }
    );
});

app.route("/api/articles/create")
    .get((req, res) => res.status(503).send({ status: "ERROR"}))
    .post((req, res) => {
        console.log(req.body);

    const sqlConnection = mysql.createConnection(sqlConfig);

    sqlConnection.query(
        "INSERT INTO node_articles (title, content, author) VALUES (?, ?, ?)", /* on ne précise pas les NULL */
        [req.body.title, req.body.content, req.body.author], /* par conséquent on ne met pas de req.body.created_date */
        (error, result) => {
            if (error) {
                console.log("ERROR :", error.code);
                res.status(503).send({ status: "ERROR"});
            } else {
                console.log(result);
                res.send({ status: "OK", articles: result });   /* préciser le result !!!!!! */
            }
            sqlConnection.end();
        }
    );
});

app.route("/api/articles/delete")
    .get((req, res) => res.status (503).send({ status: "ERROR"}))
    .post((req, res) => {
        const sqlConnection = mysql.createConnection(sqlConfig);

        sqlConnection.query(
            "DELETE FROM node_articles WHERE id = ?",
            [req.body.articlesId],
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

app.get("/api/comments", (req, res) => {
    const sqlConnection = mysql.createConnection(sqlConfig);

    sqlConnection.query(
        "SELECT id FROM node_comments ORDER BY id DESC LIMIT 5",
        (error, result) => {
            if (error) {
                console.log("ERROR :", error.code);
            } else {
                res.send(result);
            }
            sqlConnection.end();
        }
    );
});

app.route("/api/comments/create")
    .get((req, res) => res.status(503).send({ status: "ERROR"}))
    .post((req, res) => {
        console.log(req.body);

        const sqlConnection = mysql.createConnection(sqlConfig);

        sqlConnection.query(
            " INSERT INTO node_comments (article_id, author, content) VALUES ( ?, ?, ?)",
            [req.body.article_id, req.body.content, req.body.author, req.body.create_date],
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

app.route("/api/comments/delete")
    .get((req, res) => res.status (503).send({ status: "ERROR"}))
    .post((req, res) => {
        const sqlConnection = mysql.createConnection(sqlConfig);

        sqlConnection.query(
            "DELETE FROM node_comments WHERE id = ?",
            [req.body.deleteId],
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

