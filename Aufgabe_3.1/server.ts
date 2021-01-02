import * as Http from "http";

export namespace P_3_1Server {
    console.log("Starting server");
    let port: number = Number(process.env.PORT); //die Portnummer in der Varbiable port speichern
    if (!port) //wenn die Portnummer eine andere ist, den Port 8100 nehmen
        port = 8100;

    let server: Http.Server = Http.createServer(); // einen Server herstellen und in der Variable server speichern
    server.addListener("request", handleRequest); //einen Listener zu dem Server hinzufügen, der die Anfrage handlet, sofern eine da ist
    server.addListener("listening", handleListen); 
    server.listen(port);//Server horcht auf port

    function handleListen(): void {
        console.log("Listening");
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!"); //sofern eine Serveranfrage erfolgt, wird dies in der Konsole ausgegeben
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Header der Antwort des Servers
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Sicherheitsmechanisem werden ausgeschalten
        _response.write(_request.url); //Es wird die URL mit der die Anfrage gestellt wurde in die Antwort geschrieben
        _response.end(); //die Antwort wird beendet
    }
}
