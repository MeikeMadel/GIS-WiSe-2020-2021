
namespace Aufgabe2_3_2 {
 
export interface Kopf {
    name: string;
    quelle: string;
    ebene: number;
}

export interface Koerper {
    name: string;
    quelle: string;
    ebene: number;
}
    
export interface Bein {
    name: string;
    quelle: string;
    ebene: number;
}


function weiterButton ( _nextPage: string, _testStorage: string): void {
    let divButton: HTMLElement =  document.getElementById("buttonWeiter");
    let weiterButton: HTMLButtonElement = document.createElement("button");
    weiterButton.appendChild(document.createTextNode("weiter"));
    divButton.appendChild(weiterButton);

    weiterButton.addEventListener("click", link);
   
    function link(): void {
    if (localStorage.getItem(_testStorage) == null ) {
        alert("Bitte wählen Sie ein Bild aus");
    }
    else {
        document.location.href = _nextPage;
    } 
}  
}


function zurueckButton ( _pageBack: string): void {
    let divButton: HTMLElement = document.getElementById("buttonZurück");
    let buttonWeiter: HTMLButtonElement = document.createElement("button");
    buttonWeiter.appendChild(document.createTextNode("zurück"));
    divButton.appendChild(buttonWeiter);

    buttonWeiter.addEventListener("click", link);
   
    function link(): void {
        document.location.href = _pageBack;
    }
}


function createBildFinal (_idDiv: string, _quelleStorage: string, _styleId: string, _nameStorage: string): void {
    let divBild: HTMLElement = document.getElementById(_idDiv);
    let bild: HTMLImageElement = document.createElement("img");
    bild.setAttribute("id", "style" + _styleId + localStorage.getItem(_nameStorage));
    bild.setAttribute("src", localStorage.getItem(_quelleStorage));
    divBild.appendChild(bild);
}



function addImages (_auswahlAktuellDiv: string, _koerperteilStorage: Array<Kopf> , _divBilder: string, _koerperteilQuelleStorage: string, _koerperteilNameStorage: string, _styleKoerperteil: string, _linkNextPage: string): void {
    let divAuswahl: HTMLElement = document.getElementById(_auswahlAktuellDiv);
    let imgAuswahl: HTMLImageElement = document.createElement("img");
    for (let i: number = 0; i < _koerperteilStorage.length; i++) {
        let divKoerperteil: HTMLElement = document.getElementById(_divBilder + String(i));
        let bildKoerperteil: HTMLImageElement = document.createElement("img");
        bildKoerperteil.classList.add("Bilder");
        bildKoerperteil.setAttribute("src", _koerperteilStorage[i].quelle);
        bildKoerperteil.dataset.value = _koerperteilStorage[i].name;
        divKoerperteil.appendChild(bildKoerperteil);
        bildKoerperteil.addEventListener("click", auswahlBild);
        function auswahlBild(): void {
            let auswahlKoerperteil: string = _koerperteilStorage[i].quelle;
            let auswahlName: string = _koerperteilStorage[i].name;
            localStorage.setItem(_koerperteilNameStorage, auswahlName);
            localStorage.setItem(_koerperteilQuelleStorage, auswahlKoerperteil);
            imgAuswahl.setAttribute("id", _styleKoerperteil + localStorage.getItem(_koerperteilNameStorage));
            imgAuswahl.setAttribute("src", localStorage.getItem(_koerperteilQuelleStorage));
            divAuswahl.appendChild(imgAuswahl);
            location.href = _linkNextPage;
        }
    }
}

jsonLaden("http://127.0.0.1:5500/data.json");

async function jsonLaden (_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    let data = await response.json();
    localStorage.setItem("dataKopf", JSON.stringify(data.kopfJSON));
    localStorage.setItem("dataKoerper", JSON.stringify(data.koerperJSON));
    localStorage.setItem("dataBein", JSON.stringify(data.beinJSON));
    
}
let kopf: Array<Kopf> = JSON.parse(localStorage.getItem("dataKopf"));
let koerper: Array<Koerper> = JSON.parse(localStorage.getItem("dataKoerper"));
let bein: Array<Bein> = JSON.parse(localStorage.getItem("dataBein"));

    

let page: string = document.body.id;

switch (page)  {


case "kopfseite":   

weiterButton("koerper.html", "quelleKopfStorage");

//erst laden, wenn fetch ferig geladen ist
if (localStorage.getItem("dataKopf") && localStorage.getItem("dataKoerper") && localStorage.getItem("dataBein") != null) {
    //Id des Divs des ausgewählten Bildes, Array Kopf, Id bekommen des jeweiligen Divs, Quelle des Kopfes als Attribut "src", Name des Kopfs als data.value, Id für stylesheet erstellen, Link nächste Seite
    addImages("auswahlAktuell", kopf, "kopfDiv", "quelleKopfStorage", "nameKopfStorage", "styleKopf", "koerper.html");
}





break;


case "koerperseite":
    
weiterButton("beine.html", "quelleKoerperStorage");
zurueckButton("kopf.html");

//Id des Divs, Quelle des vorher ausgewählten Bildes bekommen, "Kopf" und "nameKopfStorage" Id für stylesheet erstellen
createBildFinal("auswahlAktuell", "quelleKopfStorage", "Kopf", "nameKopfStorage");

addImages("auswahlAktuell2", koerper, "koerperDiv", "quelleKoerperStorage", "nameKoerperStorage", "styleKoerper", "beine.html");



    
break;



case "beineseite":
    
    weiterButton("ende.html", "quelleBeineStorage");
    
    zurueckButton("koerper.html");
    
    createBildFinal("auswahlAktuell", "quelleKopfStorage", "Kopf", "nameKopfStorage");
    createBildFinal("auswahlAktuell2", "quelleKoerperStorage", "Koerper", "nameKoerperStorage");


    addImages("auswahlAktuell3", bein, "beineDiv", "quelleBeinStorage", "nameBeinStorage", "styleBeine", "ende.html");
    
     
    break;

    case "ende":

        async function datenSenden(_url: RequestInfo): Promise<void> {
            let query: URLSearchParams = new URLSearchParams(localStorage);
            _url = _url + "?" + query.toString();
            let response: Response = await fetch(_url);
            let jsonResponse = await response.json();
            let paragraph: HTMLElement = document.getElementById("ausgabeNachricht");
            if (jsonResponse.message != undefined) {
                paragraph.appendChild(document.createTextNode(jsonResponse.message));
            } else if (jsonResponse.error != undefined) {
                paragraph.setAttribute("id", "Fehler");
                paragraph.appendChild(document.createTextNode(jsonResponse.error));
            }
        }
        
        let divButton: HTMLElement = document.getElementById("wiederholen");
        let linkStartseite: HTMLButtonElement = document.createElement("button");
        linkStartseite.appendChild(document.createTextNode("nochmal"));
        divButton.appendChild(linkStartseite);
        
        linkStartseite.addEventListener("click", link);
        
        function link(): void {
            //nicht clear Storage, um die Daten aus der JSON Datei nicht zu löschen
            localStorage.removeItem("quelleKopfStorage");
            localStorage.removeItem("quelleKoerperStorage");
            localStorage.removeItem("quelleBeinStorage");
            localStorage.removeItem("nameKopfStorage");
            localStorage.removeItem("nameKoerperStorage");
            localStorage.removeItem("nameBeinStorage");
            document.location.href = "kopf.html";
        }
    
        createBildFinal("ergebnisKoerper", "quelleKoerperStorage", "Koerper", "nameKoerperStorage");
        createBildFinal("ergebnisBein", "quelleBeinStorage", "Beine", "nameBeinStorage");
        createBildFinal("ergebnisKopf", "quelleKopfStorage", "Kopf", "nameKopfStorage");
        
        datenSenden("https://gis-communication.herokuapp.com");
        
        break;

    }
  
}
