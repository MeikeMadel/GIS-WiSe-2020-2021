import * as Http from "http";
import * as Url from "url";


export namespace P_3_1Server {

    //let fs = require("fs");
    
    console.log("Starting server");

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;
        

    let server: Http.Server = Http.createServer(); 

    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port); 

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
       
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ": " + url.query[key]);
                console.log(key + ": " + url.query[key]);
            }
        }
        _response.end();
    }


}
/*
    let routes = {
        "Aufgabe_3.1/data": function(data: any, res:any) {
            let payload = {
                name: "payload"
            };
            let payloadString = JSON.stringify(payload);
            res.setHeader("content-type", "text/html; charset=utf-8");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.write(200);
            res.write(payloadString);
            res.wrtie(data);
            res.end();
        }
    };
    console.log(routes);

     */       

       
       
        /*

        if (_request) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); //true macht assoziatives Array
            for (let key in url.query) {
                console.log(key + ": " + url.query[key]);
            }
            let antwort = _request.query
        
        }
    
            let jsonString: string = JSON.stringify(url.query);
            console.log(jsonString);
            if (_request.method == "POST") {
              let body = "";
              _request.on("data", data => {
              body += data;
              });
              _request.on("end", async () => {
              let post: any = JSON.stringify(body);
              console.log(post);
              });
            }


        fs.readFile("./index.html", function (err: any, data: any) {
            if (err) throw err;
            
            _response.write(data);
            _response.end();
        });
        */
       

    
    
        
       
    

    






