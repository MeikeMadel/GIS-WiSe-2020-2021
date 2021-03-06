"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var P_3Server;
(function (P_3Server) {
    let nameDatenbank = "meineDatenbank";
    let nameCollection = "Anmeldeformular";
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
        default:
            console.log("Wähle lokal oder remote Datenbank");
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
        dataFormular = mongoClient.db(nameDatenbank).collection(nameCollection); // den Wert für Daten des Formulars definieren, in Datenbank gehen und Collection holen
        console.log("Database connection", dataFormular != undefined); //überprüfen, ob dataFormular einen Wert bekommen hat
    }
    function handleListen() {
        console.log("Listening");
    }
    async function retriveEmail(_email) {
        let emailLowerCase = _email.toLowerCase(); //keine neue email anlegen, falls am Anfang großgeschrieben wurde
        let findEmail = await dataFormular.countDocuments({ email: { $eq: emailLowerCase } }, { limit: 1 });
        if (findEmail == 1) {
            return true;
        }
        else {
            return false;
        }
    }
    function storeData(_data) {
        dataFormular.insertOne(_data); //übergebenen Daten werden in Datenbank eingetragen
    }
    async function retriveData() {
        let name = await dataFormular.aggregate([
            { "$group": { "_id": { fname: "$fname", lname: "$lname" } } }
        ]).toArray();
        let result = name.map(({ _id }) => _id);
        return result;
    }
    async function retriveCombi(_email, _pass) {
        let emailLowerCase = _email.toLowerCase();
        let findCombi = await dataFormular.countDocuments({
            $and: [
                { email: { $eq: emailLowerCase } },
                { passwort: { $eq: _pass } }
            ]
        });
        if (findCombi == 1) {
            return true;
        }
        else {
            return false;
        }
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request) {
            let parsedUrl = Url.parse(_request.url, true);
            let parsedUrlPathname = parsedUrl.pathname;
            let queryData = parsedUrl.query;
            let emailQuery = queryData.email;
            let passwortQuery = queryData.passwort;
            if (parsedUrlPathname == "/") {
                _response.end();
            }
            if (parsedUrlPathname == "/send") {
                retriveEmail(emailQuery).then((response) => {
                    if (response) {
                        _response.write("Diese E-mail ist bereits vergeben, logge dich ein.");
                        _response.end();
                    }
                    else {
                        storeData(parsedUrl.query);
                        _response.write("Erfolgreich registriert!");
                        _response.end();
                    }
                });
            }
            if (parsedUrlPathname == "/show") {
                retriveData().then((response) => {
                    let namenListe = "";
                    for (let i = 0; i < response.length; i++) {
                        if (i == response.length - 1) { //kein Komma am Ende, um besser zu formatieren
                            namenListe += response[i].fname + " " + response[i].lname + "\n";
                        }
                        else {
                            namenListe += response[i].fname + " " + response[i].lname + ", ";
                        }
                    }
                    _response.write(namenListe);
                    _response.end();
                });
            }
            if (parsedUrlPathname == "/login") {
                retriveCombi(emailQuery, passwortQuery).then((response) => {
                    if (response) {
                        _response.write("Login erfolgreich.");
                        _response.end();
                    }
                    else {
                        _response.write("E-mail und/oder Passwort nicht vorhanden, registriere dich.");
                        _response.end();
                    }
                });
            }
        }
    }
})(P_3Server = exports.P_3Server || (exports.P_3Server = {}));
//# sourceMappingURL=server.js.map