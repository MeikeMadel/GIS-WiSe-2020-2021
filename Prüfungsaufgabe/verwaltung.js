"use strict";
var AstAVerleih;
(function (AstAVerleih) {
    window.addEventListener("load", handleLoad);
    async function handleLoad() {
        url = url + "/verwaltung";
        let response = await fetch(url);
        let responseText = await response.text();
        let jsonResponse = JSON.parse(responseText);
        for (let i = 0; i < jsonResponse.length; i++) {
            let divData = document.getElementById("data");
            let div = document.createElement("div");
            let titelElement = document.createElement("h2");
            let buttonFrei = document.createElement("button");
            let buttonAusg = document.createElement("button");
            let buttonReserv = document.createElement("button");
            let titelArikel = jsonResponse[i].titel;
            div.setAttribute("class", "divArtikel");
            titelElement.appendChild(document.createTextNode(titelArikel));
            let fname = jsonResponse[i].fname;
            let lname = jsonResponse[i].lname;
            buttonFrei.addEventListener("click", handleClickFrei);
            buttonFrei.appendChild(document.createTextNode("frei"));
            buttonAusg.addEventListener("click", handleClickAusleihen);
            buttonAusg.appendChild(document.createTextNode("ausgeliehen"));
            buttonReserv.appendChild(document.createTextNode("reserviert"));
            buttonReserv.setAttribute("class", "styleButtonReserv");
            div.appendChild(titelElement);
            div.appendChild(buttonFrei);
            div.appendChild(buttonAusg);
            div.appendChild(buttonReserv);
            if (jsonResponse[i].status == "frei") {
                buttonFrei.setAttribute("class", "frei");
            }
            else if (jsonResponse[i].status == "ausgeliehen") {
                buttonAusg.setAttribute("class", "ausgeliehen");
                buttonFrei.addEventListener("mouseover", mouseOver);
            }
            else if (jsonResponse[i].status == "reserviert") {
                buttonReserv.setAttribute("class", "reserviert");
                buttonAusg.addEventListener("mouseover", mouseOverAusge);
            }
            if (jsonResponse[i].status == "ausgeliehen" || jsonResponse[i].status == "reserviert") { //Namen hinzufügen, wenn einer vorhanden
                let name = document.createElement("p");
                name.appendChild(document.createTextNode("Von " + fname + " " + lname));
                div.appendChild(name);
            }
            divData.appendChild(div);
            async function handleClickAusleihen(_event) {
                //An Datenbank senden, dass status von Artikel in ausgeliehen geändert wird, aber nur wenn auf reserviert
                if (jsonResponse[i].status == "reserviert") {
                    url = url + "/ausleihen" + "?" + "titel=" + titelArikel;
                    location.reload();
                    await fetch(url);
                }
            }
            async function handleClickFrei(_event) {
                if (jsonResponse[i].status == "ausgeliehen") {
                    url = url + "/frei" + "?" + "titel=" + titelArikel;
                    location.reload(); //dass Name gleich entfernt wird 
                    await fetch(url);
                } //verhindern, dass was passiert, wenn Artikel eh schon frei ist oder reserviert, reservierte Artikel können nicht frei werden
                //braucht nur den Titel um Artikel durch titel zu suchen und Status auf frei zu setzen und Name in leeren string zu ändern
            }
            function mouseOver(_event) {
                buttonFrei.setAttribute("class", "hoverFrei");
            }
            function mouseOverAusge(_event) {
                buttonAusg.setAttribute("class", "hoverAusgeh");
            }
        }
    }
})(AstAVerleih || (AstAVerleih = {}));
//# sourceMappingURL=verwaltung.js.map