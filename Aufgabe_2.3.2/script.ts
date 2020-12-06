
namespace Aufgabe2_3_2 {
 
export interface Koepfe {
    name: string;
    quelle: string;
    ebene: number;
}

export interface Koerper {
    name: string;
    quelle: string;
    ebene: number;
}
    
export interface Beine {
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


function zurueckButton ( _s: string): void {
    let divButton: HTMLElement = document.getElementById("buttonZurück");
    let buttonWeiter: HTMLButtonElement = document.createElement("button");
    buttonWeiter.appendChild(document.createTextNode("zurück"));
    divButton.appendChild(buttonWeiter);

    buttonWeiter.addEventListener("click", link);
   
    function link(): void {
        document.location.href = _s;
    }
}


function createBildFinal (_id: string, _quelleStorage: string, _styleId: string, _nameStorage: string): void {
    let _div: HTMLElement = document.getElementById(_id);
    let _img: HTMLImageElement = document.createElement("img");
    _img.setAttribute("id", "style" + _styleId + localStorage.getItem(_nameStorage));
    _img.setAttribute("src", localStorage.getItem(_quelleStorage));
    _div.appendChild(_img);
}

function addImages (_auswahlAktuell: string, _storedKoerperteil: Array<Koepfe> , _div: string, _koerperteilQuelleStorage: string, _koerperteilNameStorage: string, _styleKoerperteil: string, _linkNextPage: string): void {
    let divChoice: HTMLElement = document.getElementById(_auswahlAktuell);
    let choice: HTMLImageElement = <HTMLImageElement> document.createElement("img");
    for (let i: number = 0; i < _storedKoerperteil.length; i++) {
        let divKoerperteil: HTMLElement = document.getElementById(_div + String(i));
        let bildKoerperteil: HTMLImageElement = document.createElement("img");
        bildKoerperteil.classList.add("Bilder");
        bildKoerperteil.setAttribute("src", _storedKoerperteil[i].quelle);
        bildKoerperteil.dataset.value = _storedKoerperteil[i].name;
        divKoerperteil.appendChild(bildKoerperteil);
        bildKoerperteil.addEventListener("click", auswahlBild);
        function auswahlBild(): void {
            let auswahlKoerperteil: string = _storedKoerperteil[i].quelle;
            let auswahlName: string = _storedKoerperteil[i].name;
            localStorage.setItem(_koerperteilNameStorage, auswahlName);
            localStorage.setItem(_koerperteilQuelleStorage, auswahlKoerperteil);
            choice.setAttribute("id", _styleKoerperteil + localStorage.getItem(_koerperteilNameStorage));
            choice.setAttribute("src", localStorage.getItem(_koerperteilQuelleStorage));
            divChoice.appendChild(choice);
            location.href = _linkNextPage;
        }
    }
}

jsonLaden("http://127.0.0.1:5500/data.json");

   
async function jsonLaden (_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    let data = await response.json();
    localStorage.setItem("dataKoepfe", JSON.stringify(data.koepfeJSON));
    localStorage.setItem("dataKoerper", JSON.stringify(data.koerperJSON));
    localStorage.setItem("dataBeine", JSON.stringify(data.beineJSON));
}

let koepfe: Array<Koepfe> = JSON.parse(localStorage.getItem("dataKoepfe"));
let koerper: Array<Koerper> = JSON.parse(localStorage.getItem("dataKoerper"));
let beine: Array<Beine> = JSON.parse(localStorage.getItem("dataBeine"));
let page: string = document.body.id;

switch (page)  {


case "kopfseite":

weiterButton("koerper.html", "quelleKopfStorage");

addImages("auswahlAktuell", koepfe, "kopfDiv", "quelleKopfStorage", "nameKopfStorage", "styleKopf", "koerper.html");

break;


case "koerperseite":

weiterButton("beine.html", "quelleKoerperStorage");
zurueckButton("kopf.html");

createBildFinal("auswahlAktuell", "quelleKopfStorage", "Kopf", "nameKopfStorage");

addImages("auswahlAktuell2", koerper, "koerperDiv", "quelleKoerperStorage", "nameKoerperStorage", "styleKoerper", "beine.html");



    
break;



case "beineseite":
    
    weiterButton("ende.html", "quelleBeineStorage");
    
    zurueckButton("koerper.html");
    
    createBildFinal("auswahlAktuell", "quelleKopfStorage", "Kopf", "nameKopfStorage");
    createBildFinal("auswahlAktuell2", "quelleKoerperStorage", "Koerper", "nameKoerperStorage");


    addImages("auswahlAktuell3", beine, "beineDiv", "quelleBeineStorage", "nameBeineStorage", "styleBeine", "ende.html");
    
     
    break;

    case "ende":
        async function datenSenden(_url: RequestInfo): Promise<void> {
            let query: URLSearchParams = new URLSearchParams(localStorage);
            _url = _url + "?" + query.toString();
            let response: Response = await fetch(_url);
            let jsonAntwort = await response.json();
            let paragraph: HTMLElement = document.getElementById("ausgabeNachricht");
            if (jsonAntwort.message != undefined) {
                paragraph.appendChild(document.createTextNode(jsonAntwort.message));
            } else if (jsonAntwort.error != undefined) {
                paragraph.setAttribute("id", "Fehler");
                paragraph.appendChild(document.createTextNode(jsonAntwort.error));
            }
        }
        
        let kopfButtonLink: HTMLElement = document.getElementById("kopfButton");
        let linkKopfSeite: HTMLButtonElement = document.createElement("button");
        linkKopfSeite.appendChild(document.createTextNode("nochmal"));
        kopfButtonLink.appendChild(linkKopfSeite);
        
        linkKopfSeite.addEventListener("click", link);
        
        function link(): void {
            localStorage.clear();
            document.location.href = "kopf.html";
        }

        datenSenden("https://gis-communication.herokuapp.com");

    
        createBildFinal("ergebnisKoerper", "quelleKoerperStorage", "Koerper", "nameKoerperStorage");
        createBildFinal("ergebnisBein", "quelleBeineStorage", "Beine", "nameBeineStorage");
        createBildFinal("ergebnisKopf", "quelleKopfStorage", "Kopf", "nameKopfStorage");
        
        
        break;

    }
  
}
