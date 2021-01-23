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

    async function retriveEmail(_email: string): Promise<boolean> {
        let emailLowerCase: string = _email.toLowerCase(); //keine neue email anlegen, falls am Anfang großgeschrieben wurde
        let findEmail: number = await dataFormular.countDocuments({email: {$eq: emailLowerCase}}, {limit: 1});
        if (findEmail == 1) {
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

    async function retriveCombi(_email: string, _pass: string | string[]): Promise<boolean> {
        let emailLowerCase: string = _email.toLowerCase();
        let findCombi: number = await dataFormular.countDocuments({
            $and: [
                {email: {$eq: emailLowerCase}}, 
                {passwort: {$eq: _pass}}
            ]
        });
        if (findCombi == 1) {
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
            let emailQuery: string = <string> queryData.email;
            let passwortQuery: string | string[] = queryData.passwort;
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
                    let namenListe: string = "";
                    for (let i: number = 0; i < response.length; i++) {
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


}
