"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
var P_3_1Server;
(function (P_3_1Server) {
    //let fs = require("fs");
    console.log("Starting server");
    let port = Number(process.env.PORT); //die Portnummer in der Varbiable port speichern
    if (!port) //wenn die Portnummer eine andere ist, den Port 8100 nehmen
        port = 8100;
    let server = Http.createServer(); // einen Server herstellen und in der Variable server speichern
    server.addListener("request", handleRequest); //einen Listener zu dem Server hinzufügen, der die Anfrage handlet, sofern eine da ist
    server.addListener("listening", handleListen);
    server.listen(port); //Server horcht auf port
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!"); //sofern eine Serveranfrage erfolgt, wird dies in der Konsole ausgegeben
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Header der Antwort des Servers
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Sicherheitsmechanisem werden ausgeschalten
        _response.write(_request.url); //Es wird die URL mit der die Anfrage gestellt wurde in die Antwort geschrieben
        _response.end(); //die Antwort wird beendet
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map