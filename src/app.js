const express = require("express");

const app = express();

app.listen(3001, () => {
    console.log("SERVEUR STARTED !");
});

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true}));

module.exports = app;