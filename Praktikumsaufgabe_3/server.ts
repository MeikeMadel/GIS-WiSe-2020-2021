import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace P_3Server {

    let nameDatenbank: string = "meineDatenbank";
    let nameCollection: string = "Anmeldeformular";

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
        default:
            console.log("Wähle lokal oder remote Datenbank");
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
        dataFormular = mongoClient.db(nameDatenbank).collection(nameCollection); // den Wert für Daten des Formulars definieren, in Datenbank gehen und Collection holen
        console.log("Database connection", dataFormular != undefined); //überprüfen, ob dataFormular einen Wert bekommen hat
    }


    function handleListen(): void {
        console.log("Listening");
    }

    async function retriveEmail(_email: string | string[]): Promise<boolean> {
        let findEmail: number = await dataFormular.countDocuments({email: {$eq: _email}}, {limit: 1});
        if (findEmail != 0) {
            return true;
        }
        else {
            return false;
        }
    }

    function storeData(_data: Data): void { 
        dataFormular.insertOne(_data); //übergebenen Daten werden in Datenbank eingetragen
    }

    async function retriveData(): Promise<any> {
        let name: any[] = await dataFormular.aggregate( 
            [
                {"$group": { "_id": { fname: "$fname", lname: "$lname" } } }
            ]
        ).toArray();
        let result = name.map(({ _id}) => _id);
        return result;
    }

    async function retriveCombi(_email: string | string[], _pass: string | string[]): Promise<boolean> {
        let findCombi: number = await dataFormular.countDocuments({
            $and: [
                {email: {$eq: _email}}, 
                {passwort: {$eq: _pass}}
            ]
        });
        if (findCombi != 0) {
            return true;
        }
        else {
            return false;
        }
    }

 
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8"); 
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request) {
            let parsedUrl: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let parsedUrlPathname: string = parsedUrl.pathname;
            let queryData = parsedUrl.query;
            let emailQuery: string | string[] = queryData.email;
            let passwortQuery: string | string[] = queryData.passwort;
            if (parsedUrlPathname == "/send") {
                retriveEmail(emailQuery).then((response) => {
                    if (response) {
                        console.log(response);
                        _response.write("Diese E-mail ist bereits vergeben", function(): void {
                            _response.end();  
                        });  
                    }
                    else {
                        console.log(response);
                        _response.write("Daten gespeichert", function(): void {
                            _response.end();
                        });
                        storeData(parsedUrl.query);
                    }  
                });   
            }
            else if (parsedUrlPathname == "/show") {
                retriveData().then((response) => {
                    let namenListe: string = "";
                    for (let i: number = 0; i < response.length; i++) {
                        namenListe += JSON.stringify(response[i].fname + " " + response[i].lname) + "\n"; 
                        
                    }
                    _response.write(namenListe);
                    _response.end();
                });
            }
            else if (parsedUrlPathname == "/login") {
                retriveCombi(emailQuery, passwortQuery).then((response) => {
                    if (response) {
                        _response.write("E-mail und Passwort vorhanden");
                        _response.end();
                    }
                    else {
                        _response.write("Kombination ist nicht vorhanden, Registriere dich");
                        _response.end();
                    }
                });
            }
        }
        _response.end();
    }

}
