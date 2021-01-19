import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


export namespace P_3_1Server {

    interface Data {
        [type: string]: string | string[]; // Wert ist ein String oder String Array in dem JSON String
    }

    let dataFormular: Mongo.Collection;

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
        dataFormular = mongoClient.db("meineDatenbank").collection("Anmeldeformular"); // den Wert für Daten des Formulars definieren, in Datenbank gehen und Collection holen
        console.log("Database connection", dataFormular != undefined); //überprüfen, ob dataFormular einen Wert bekommen hat
    }


    function handleListen(): void {
        console.log("Listening");
    }

 
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request) {
            let parsedUrl: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let parsedUrlPathname: string = parsedUrl.pathname;
            if (parsedUrlPathname == "/send") {
                storeData(parsedUrl.query);
            }
            else if (parsedUrlPathname == "/store") {
                retriveData();
                async function retriveData(): Promise<void> {
                    let arrayData = await dataFormular.find().toArray();
                    let stringData: string = JSON.stringify(arrayData);
                    _response.write(stringData);
                    
                }
            }
        }
        _response.end();
    }

    function storeData(_data: Data): void { 
        dataFormular.insertOne(_data); //übergebenen Daten werden in Datenbank eingetragen
    }

}
