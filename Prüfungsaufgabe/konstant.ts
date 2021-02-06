
namespace AstAVerleih {

    export let divContent: HTMLElement = document.getElementById("content");
    export let divArtikel: HTMLDivElement = <HTMLDivElement> document.createElement("div");
    export let divText: HTMLDivElement = <HTMLDivElement> document.createElement("div");
    export let bild: HTMLImageElement = document.createElement("img");
    export let button: HTMLButtonElement = document.createElement("button");
    export let buttonFrei: HTMLButtonElement = document.createElement("button");
    export let titel: HTMLHeadingElement = document.createElement("h2");
    export let beschreibungText: HTMLParagraphElement = document.createElement("p");
    export let status: HTMLParagraphElement = document.createElement("p");
    export let gebuehrParagraph: HTMLParagraphElement = document.createElement("p");

    //reserv.ts

    export let fname: HTMLInputElement = <HTMLInputElement>document.getElementById("fname");
    export let lname: HTMLInputElement = <HTMLInputElement>document.getElementById("lname");
    export let form: HTMLFormElement = <HTMLFormElement> document.getElementById("formular");
    export let serverAntwort: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("serverAntowrt");
    
    
    //verwatltung.ts
/*
    export let divData: HTMLElement = document.getElementById("data");
    export let div: HTMLDivElement = <HTMLDivElement> document.createElement("div");
    export let titelElement: HTMLHeadingElement = document.createElement("h2");
    export let buttonAusg: HTMLButtonElement = document.createElement("button");
    export let buttonReserv: HTMLButtonElement = document.createElement("button");
*/
}