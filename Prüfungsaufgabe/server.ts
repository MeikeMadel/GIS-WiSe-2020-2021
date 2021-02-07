import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";



export namespace AstaVerleih {

    interface Artikel {
        titel: string;
        bild: string;
        beschreibung: string;
        gebuehr: number;
        status: string; 
        fname: string;
        lname: string;
    }

    let dataArtikel: Mongo.Collection;

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    let databaseUrl: string; 

    let urlDB: string[] = process.argv.slice(2);

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
    
    function startServer (_port: number | string): void {
        let server: Http.Server = Http.createServer(); 
        console.log("Starting server on port: " + _port);
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port); 
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true}; //mit diesen Dingen Verbindung zu Datenbank erzeugen
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options); //Adresse Datenbank, Optionen die übergeben werden
        await mongoClient.connect(); //Rückgabewert Promise
        dataArtikel = mongoClient.db("Artikelverleih").collection("Artikel"); // den Wert für Daten des Formulars definieren, in Datenbank gehen und Collection holen
        console.log("Database connection", dataArtikel != undefined); //überprüfen, ob dataFormular einen Wert bekommen hat
    }

    function handleListen(): void {
        console.log("Listening");
    }

    async function getContent(): Promise<Array<Artikel>> {
        let content: Array<Artikel> = await dataArtikel.find().toArray();
        return content;
      
    }

    async function sendData(_fname: string, _lname: string, _titel: string | Array<String>): Promise<void> {
        if (typeof _titel === "string") { // wenn nur ein Artikel reserviert wird
            await dataArtikel.findOneAndUpdate(
                {"titel": {$eq: _titel}},
                { $set: {
                        status: "reserviert",
                        fname: _fname,
                        lname: _lname
                    }
                });
        }
        else { 
            for (let i: number = 0; i < _titel.length; i++) {
                await dataArtikel.findOneAndUpdate(
                    {"titel": {$eq: _titel[i]}},
                    { $set: {
                            status: "reserviert",
                            fname: _fname,
                            lname: _lname
                        }
                    });
                }
        }
    }

    async function verwaltungContent(): Promise<Array<Artikel>> {
        let verwaltungData: Array<Artikel> = await dataArtikel.find().toArray();
        return verwaltungData;
    }

    async function changeStatus(_titel: string): Promise<void> {
        await dataArtikel.findOneAndUpdate(
            {"titel": {$eq: _titel}}, 
            {$set: {status: "ausgeliehen"}}
        );
    }

    async function statusFrei(_titel: string): Promise<void> {
        await dataArtikel.findOneAndUpdate(
            {"titel": {$eq: _titel}}, 
            {$set: {
                status: "frei", 
                fname: "", 
                lname: ""
            }
        });
    }

 
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request) {
            let parsedUrl: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let parsedUrlPathname: string = parsedUrl.pathname;
            let queryData = parsedUrl.query;
            let titelQuery: string = <string> queryData.titel;
            let fnameQuery: string = <string> queryData.fname;
            let lnameQuery: string = <string> queryData.lname;
            if (parsedUrlPathname == "/") {
                getContent().then((response) => {
                    let stringContent: string = JSON.stringify(response);
                    _response.write(stringContent);
                    _response.end();
                });
            }
            else if (parsedUrlPathname == "reservierung.html/reservierung/send") {
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
            else if (parsedUrlPathname == "astaVerwaltung.html/verwaltung") {
                verwaltungContent().then((response) => {
                    let stringData: string = JSON.stringify(response);
                    _response.write(stringData);
                    _response.end();
                });
            }
            else if (parsedUrlPathname == "astaVerwaltung.html/verwaltung/ausleihen") {
                changeStatus(titelQuery);
                _response.end();
            }
            else if (parsedUrlPathname == "astaVerwaltung.html/verwaltung/frei") {
                statusFrei(titelQuery);
                _response.end();
            }
        }
        
    }

    

}