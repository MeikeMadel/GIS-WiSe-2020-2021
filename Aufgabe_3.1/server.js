"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var P_3_1Server;
(function (P_3_1Server) {
    let dataFormular;
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
        dataFormular = mongoClient.db("meineDatenbank").collection("Anmeldeformular"); // den Wert für Daten des Formulars definieren, in Datenbank gehen und Collection holen
        console.log("Database connection", dataFormular != undefined); //überprüfen, ob dataFormular einen Wert bekommen hat
    }
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request) {
            let parsedUrl = Url.parse(_request.url, true);
            let parsedUrlPathname = parsedUrl.pathname;
            if (parsedUrlPathname == "/send") {
                storeData(parsedUrl.query);
            }
            else if (parsedUrlPathname == "/store") {
                retriveData();
                async function retriveData() {
                    let arrayData = await dataFormular.find().toArray();
                    let stringData = JSON.stringify(arrayData);
                    _response.write(stringData);
                }
            }
        }
        _response.end();
    }
    function storeData(_data) {
        dataFormular.insertOne(_data); //übergebenen Daten werden in Datenbank eingetragen
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map