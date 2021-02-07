"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstaVerleih = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var AstaVerleih;
(function (AstaVerleih) {
    let dataArtikel;
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let databaseUrl;
    let urlDB = process.argv.slice(2);
    switch (urlDB[0]) {
        case "lokal":
            databaseUrl = "mongodb://localhost:27017";
            break;
        case "remote":
            databaseUrl = "mongodb+srv://firstUser:passwort@meikemadel.c13ms.mongodb.net/<dbname>?retryWrites=true&w=majority";
            break;
    }
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Starting server on port: " + _port);
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true }; //mit diesen Dingen Verbindung zu Datenbank erzeugen
        let mongoClient = new Mongo.MongoClient(_url, options); //Adresse Datenbank, Optionen die übergeben werden
        await mongoClient.connect(); //Rückgabewert Promise
        dataArtikel = mongoClient.db("Artikelverleih").collection("Artikel"); // den Wert für Daten des Formulars definieren, in Datenbank gehen und Collection holen
        console.log("Database connection", dataArtikel != undefined); //überprüfen, ob dataFormular einen Wert bekommen hat
    }
    function handleListen() {
        console.log("Listening");
    }
    async function getContent() {
        let content = await dataArtikel.find().toArray();
        return content;
    }
    async function sendData(_fname, _lname, _titel) {
        if (typeof _titel === "string") { // wenn nur ein Artikel reserviert wird
            await dataArtikel.findOneAndUpdate({ "titel": { $eq: _titel } }, { $set: {
                    status: "reserviert",
                    fname: _fname,
                    lname: _lname
                }
            });
        }
        else {
            for (let i = 0; i < _titel.length; i++) {
                await dataArtikel.findOneAndUpdate({ "titel": { $eq: _titel[i] } }, { $set: {
                        status: "reserviert",
                        fname: _fname,
                        lname: _lname
                    }
                });
            }
        }
    }
    async function verwaltungContent() {
        let verwaltungData = await dataArtikel.find().toArray();
        return verwaltungData;
    }
    async function changeStatus(_titel) {
        await dataArtikel.findOneAndUpdate({ "titel": { $eq: _titel } }, { $set: { status: "ausgeliehen" } });
    }
    async function statusFrei(_titel) {
        await dataArtikel.findOneAndUpdate({ "titel": { $eq: _titel } }, { $set: {
                status: "frei",
                fname: "",
                lname: ""
            }
        });
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request) {
            let parsedUrl = Url.parse(_request.url, true);
            let parsedUrlPathname = parsedUrl.pathname;
            let queryData = parsedUrl.query;
            let titelQuery = queryData.titel;
            let fnameQuery = queryData.fname;
            let lnameQuery = queryData.lname;
            if (parsedUrlPathname == "/") {
                getContent().then((response) => {
                    let stringContent = JSON.stringify(response);
                    _response.write(stringContent);
                    _response.end();
                });
            }
            else if (parsedUrlPathname == "/send") {
                sendData(fnameQuery, lnameQuery, titelQuery);
                if (typeof titelQuery === "string") {
                    _response.write("Dein Artikel wurde für dich reserviert!");
                    _response.end();
                }
                else {
                    _response.write("Deine Artikel wurden für dich reserviert!");
                    _response.end();
                }
            }
            else if (parsedUrlPathname == "/verwaltung") {
                verwaltungContent().then((response) => {
                    let stringData = JSON.stringify(response);
                    _response.write(stringData);
                    _response.end();
                });
            }
            else if (parsedUrlPathname == "/verwaltung/ausleihen") {
                changeStatus(titelQuery);
            }
            else if (parsedUrlPathname == "/verwaltung/frei") {
                statusFrei(titelQuery);
            }
        }
    }
})(AstaVerleih = exports.AstaVerleih || (exports.AstaVerleih = {}));
//# sourceMappingURL=server.js.map