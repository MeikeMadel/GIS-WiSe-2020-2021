
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

auswahlJSONkonvertieren();

function auswahlJSONkonvertieren(): void {
    let koepfe: Koepfe [] = JSON.parse(koepfeAuswahlJSON);
    console.log(koepfe[0].name);
    let koerper: Koerper [] = JSON.parse(koerperAuswahlJSON);
    console.log(koerper[0].name);
    let beine: Beine [] = JSON.parse(beineAuswahlJSON);
    console.log(beine[0].name);
}


let koepfe: Koepfe [] = JSON.parse(koepfeAuswahlJSON);
let koerper: Koerper [] = JSON.parse(koerperAuswahlJSON);
let beine: Beine [] = JSON.parse(beineAuswahlJSON);




function weiterButton ( _s: string, _testStorage: string): void {
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
        document.location.href = _s;
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

function addImages (_auswahlaktuell: string, _koerperteil: string, _div: string, _koerperteilQuelleStorage: string, _koerperteilNameStorage: string, _styleKoerperteil: string): void {
    let divChoice: HTMLElement = document.getElementById(_auswahlaktuell);
    let choice: HTMLImageElement = <HTMLImageElement> document.createElement("img");
    for (let i: number = 0; i < _koerperteil.length; i++) {
        let divKoerperteil: HTMLElement = document.getElementById(_div + String(i));
        let bildKoerperteil: HTMLImageElement = document.createElement("img");
        bildKoerperteil.classList.add("Bilder");
        bildKoerperteil.setAttribute("src", _koerperteil[i].quelle);
        bildKoerperteil.dataset.value = _koerperteil[i].;
        divKoerperteil.appendChild(bildKoerperteil);
        bildKoerperteil.addEventListener("click", auswahlBild);
        function auswahlBild(): void {
            let auswahlKoerperteil: string = _koerperteil[i].quelle;
            let auswahlName: string = _koerperteil[i].name;
            localStorage.setItem(_koerperteilNameStorage, auswahlName);
            localStorage.setItem(_koerperteilQuelleStorage, auswahlKoerperteil);
            choice.setAttribute("id", _styleKoerperteil + localStorage.getItem(_koerperteilNameStorage));
            choice.setAttribute("src", localStorage.getItem(_koerperteilQuelleStorage));
            divChoice.appendChild(choice);
        }
    }
}

let page: string = document.body.id;

switch (page)  {


case "kopfseite":

    weiterButton("koerper.html", "quelleKopfStorage");
    
    let divChoice: HTMLElement = document.getElementById("auswahlaktuell");
    let choice: HTMLImageElement = <HTMLImageElement> document.createElement("img");
    
    for (let i: number = 0; i < koepfe.length; i++) {

        let divKopf: HTMLElement = document.getElementById("kopfDiv" + String(i));
        let bildKopf: HTMLImageElement = <HTMLImageElement> document.createElement("img");
        bildKopf.classList.add("Bilder");
        bildKopf.setAttribute("src", koepfe[i].quelle);
        bildKopf.dataset.value = koepfe[i].name;
        divKopf.appendChild(bildKopf);
        bildKopf.addEventListener("click", auswahlBild);
        function auswahlBild(): void {
            let auswahlKopf: string = koepfe[i].quelle;
            let auswahlName: string = koepfe[i].name;
            localStorage.setItem("nameKopfStorage", auswahlName);
            localStorage.setItem("quelleKopfStorage", auswahlKopf);
            choice.setAttribute("id", "styleKopf" + localStorage.getItem("nameKopfStorage"));
            choice.setAttribute("src", localStorage.getItem("quelleKopfStorage"));
            divChoice.appendChild(choice);
        }

        
    }
    
    break;


case "koerperseite":
weiterButton("beine.html", "quelleKoerperStorage");
zurueckButton("kopf.html");



createBildFinal("auswahlaktuell", "quelleKopfStorage", "Kopf", "nameKopfStorage");

let divChoice2: HTMLElement = document.getElementById("auswahlaktuell2");
let choice2: HTMLImageElement = document.createElement("img");


for (let i: number = 0; i < koerper.length; i++) {
    let b: number = i;
    let divKoerper: HTMLElement = document.getElementById("koerperDiv" + String(b));
    let bildKoerper: HTMLImageElement = document.createElement("img");
    bildKoerper.classList.add("Bilder");
    bildKoerper.setAttribute("src", koerper[i].quelle);
    bildKoerper.dataset.value = koerper[i].name;
    divKoerper.appendChild(bildKoerper);
    bildKoerper.addEventListener("click", linkBeine);

    function linkBeine(): void {
        let auswahlKoerper: string = koerper[i].quelle;
        let auswahlName: string = koerper[i].name;
        localStorage.setItem("nameKoerperStorage", auswahlName);
        localStorage.setItem("quelleKoerperStorage", auswahlKoerper);
        choice2.setAttribute("id", "styleKoerper" + localStorage.getItem("nameKoerperStorage"));
        choice2.setAttribute("src", localStorage.getItem("quelleKoerperStorage"));
        divChoice2.appendChild(choice2);
        }
    }

    
break;



case "beineseite":
    weiterButton("ende.html", "quelleBeineStorage");
    zurueckButton("koerper.html");
    
    
    createBildFinal("auswahlaktuell", "quelleKopfStorage", "Kopf", "nameKopfStorage");
    createBildFinal("auswahlaktuell2", "quelleKoerperStorage", "Koerper", "nameKoerperStorage");

    let divChoice3: HTMLElement = document.getElementById("auswahlaktuell3");
    let choice3: HTMLImageElement = document.createElement("img");


    for (let i: number = 0; i < beine.length; i++) {
        let a: number = i;
        let divBeine: HTMLElement = document.getElementById("beineDiv" + String(a));
        let bildBeine: HTMLImageElement = document.createElement("img");
        bildBeine.classList.add("Bilder");
        bildBeine.setAttribute("src", beine[i].quelle);
        bildBeine.dataset.value = beine[i].name;
        divBeine.appendChild(bildBeine);
        bildBeine.addEventListener("click", linkStartseite);
        function linkStartseite(): void {
            let auswahlBeine: string = beine[i].quelle;
            let auswahlName: string = beine[i].name;
            localStorage.setItem("nameBeineStorage", auswahlName);
            localStorage.setItem("quelleBeineStorage", auswahlBeine);
            choice3.setAttribute("src", localStorage.getItem("quelleBeineStorage"));
            choice3.setAttribute("id", "styleBeine" + localStorage.getItem("nameBeineStorage"));
            divChoice3.appendChild(choice3);
            
        }
       
    }
    break;

    case "ende":
    

        let kopfButtonLink: HTMLElement = document.getElementById("kopfButton");
        let linkKopfSeite: HTMLButtonElement = document.createElement("button");
        linkKopfSeite.appendChild(document.createTextNode("nochmal"));
        kopfButtonLink.appendChild(linkKopfSeite);
        
        linkKopfSeite.addEventListener("click", linkKopf);
        
        function linkKopf(): void {
            localStorage.clear();
            document.location.href = "kopf.html";
        }
        
       
        
        createBildFinal("ergebnisKoerper", "quelleKoerperStorage", "Koerper", "nameKoerperStorage");
        createBildFinal("ergebnisBein", "quelleBeineStorage", "Beine", "nameBeineStorage");
        createBildFinal("ergebnisKopf", "quelleKopfStorage", "Kopf", "nameKopfStorage");
        
        
        break;
}

}
