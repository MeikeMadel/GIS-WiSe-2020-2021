

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
let kopfButtonLink: HTMLElement = document.getElementById("kopfButton");
let linkKopfSeite: HTMLButtonElement = document.createElement("button");
linkKopfSeite.appendChild(document.createTextNode("Kopf"));
kopfButtonLink.appendChild(linkKopfSeite);

linkKopfSeite.addEventListener("click", linkKopf);

function linkKopf(): void {
    document.location.href = "kopf.html";
}
let beineButtonLink: HTMLElement = document.getElementById("beineButton");
let linkBeineSeite: HTMLButtonElement = document.createElement("button");
linkBeineSeite.appendChild(document.createTextNode("Beine"));
beineButtonLink.appendChild(linkBeineSeite);

linkBeineSeite.addEventListener("click", linkBeine);

function linkBeine(): void {
    document.location.href = "beine.html";
}

let koerperButtonLink: HTMLElement = document.getElementById("koerperButton");
let linkKoerperSeite: HTMLButtonElement = document.createElement("button");
linkKoerperSeite.appendChild(document.createTextNode("Körper"));
koerperButtonLink.appendChild(linkKoerperSeite);

linkKoerperSeite.addEventListener("click", linkKoerper);

function linkKoerper(): void {
    document.location.href = "koerper.html";
}


let divKopf: HTMLElement = document.getElementById("kopfDiv");
let kopfBild: HTMLImageElement = document.createElement("img");
kopfBild.setAttribute("scr", "..Aufgabe_2.3.2/zebra-kopf.jpg");
kopfBild.classList.add("Bilder");
divKopf.appendChild(kopfBild);



let divKoerper: HTMLElement = document.getElementById("koerperDiv");
let koerperBild: HTMLImageElement = document.createElement("img");
koerperBild.setAttribute("scr", "zebra-koerper.jpg");
koerperBild.classList.add("Bilder");
divKoerper.appendChild(koerperBild);



let divBeine: HTMLElement = document.getElementById("beineDiv");
let beineBild: HTMLImageElement = document.createElement("img");
beineBild.setAttribute("scr", "zebra-beine.jpg");
beineBild.classList.add("Bilder");
divBeine.appendChild(beineBild);



}
