"use strict";
var AstAVerleih;
(function (AstAVerleih) {
    window.addEventListener("load", handleLoad);
    AstAVerleih.url = "https://giswise20202021.herokuapp.com";
    async function handleLoad() {
        localStorage.clear();
        AstAVerleih.url = AstAVerleih.url + "/";
        let response = await fetch(AstAVerleih.url);
        let responseText = await response.text();
        let jsonResponse = JSON.parse(responseText);
        for (let i = 0; i < jsonResponse.length; i++) {
            let divContent = document.getElementById("content");
            let divArtikel = document.createElement("div");
            let divText = document.createElement("div");
            let bild = document.createElement("img");
            let button = document.createElement("button");
            let titel = document.createElement("h2");
            let beschreibungText = document.createElement("p");
            let status = document.createElement("p");
            let gebuehrParagraph = document.createElement("p");
            let titelName = jsonResponse[i].titel;
            divContent.appendChild(divArtikel);
            bild.setAttribute("src", jsonResponse[i].bild);
            bild.setAttribute("alt", titelName);
            button.setAttribute("class", "buttonReservieren");
            button.appendChild(document.createTextNode("reservieren"));
            if (jsonResponse[i].status == "ausgeliehen" || jsonResponse[i].status == "reserviert") { //um beides auszugrauen
                divArtikel.setAttribute("class", "ausgeliehen");
                bild.setAttribute("class", "bildGrau");
                button.setAttribute("class", "buttonAusgeliehen");
            }
            titel.appendChild(document.createTextNode(titelName));
            beschreibungText.appendChild(document.createTextNode(jsonResponse[i].beschreibung));
            if (jsonResponse[i].status == "reserviert" || jsonResponse[i].status == "ausgeliehen") { // soll nicht angezeigt werde, wenn Artikel reserviert ist 
                status.appendChild(document.createTextNode("Artikel aktuell ausgeliehen"));
            }
            let gebuehr = jsonResponse[i].gebuehr;
            gebuehrParagraph.appendChild(document.createTextNode("Gebühr: " + gebuehr + " €"));
            divArtikel.append(titel);
            divArtikel.appendChild(bild);
            divText.appendChild(beschreibungText);
            divText.appendChild(gebuehrParagraph);
            divText.appendChild(status);
            divArtikel.appendChild(divText);
            divArtikel.appendChild(button);
            let countClick = 0;
            if (jsonResponse[i].status == "frei") {
                button.addEventListener("click", handleAusleihen);
            }
            async function handleAusleihen(_event) {
                countClick++;
                if (countClick % 2 == 0) { //wenn 2x auf Artikel geklickt wird, wird wieder entfernt von Summe und aus localStorage.ausgeliehen
                    divArtikel.removeAttribute("class");
                    localStorage.ausgeliehen = String(localStorage.ausgeliehen).replace("&titel=" + titelName, "");
                    localStorage.addSumme = Number(localStorage.addSumme) - Number(gebuehr);
                }
                else {
                    divArtikel.setAttribute("class", "selected");
                    if (localStorage.ausgeliehen) {
                        localStorage.ausgeliehen = String(localStorage.ausgeliehen) + "&titel=" + titelName;
                    }
                    else {
                        localStorage.ausgeliehen = "&titel=" + titelName;
                        console.log(localStorage.ausgeliehen);
                    }
                    if (localStorage.addSumme) {
                        localStorage.addSumme = Number(localStorage.addSumme) + Number(gebuehr); //anzeigen, dass Nummer ist und kein String
                    }
                    else {
                        localStorage.addSumme = gebuehr;
                        console.log(localStorage.addSumme);
                    }
                }
                document.getElementById("gebuehrGesamt").innerHTML = localStorage.addSumme + "€";
            }
        }
    }
})(AstAVerleih || (AstAVerleih = {}));
//# sourceMappingURL=data.js.map