"use strict";
var Aufgabe2_3_2;
(function (Aufgabe2_3_2) {
    function weiterButton(_nextPage, _testStorage) {
        let divButton = document.getElementById("buttonWeiter");
        let weiterButton = document.createElement("button");
        weiterButton.appendChild(document.createTextNode("weiter"));
        divButton.appendChild(weiterButton);
        weiterButton.addEventListener("click", link);
        function link() {
            if (localStorage.getItem(_testStorage) == null) {
                alert("Bitte wählen Sie ein Bild aus");
            }
            else {
                document.location.href = _nextPage;
            }
        }
    }
    function zurueckButton(_s) {
        let divButton = document.getElementById("buttonZurück");
        let buttonWeiter = document.createElement("button");
        buttonWeiter.appendChild(document.createTextNode("zurück"));
        divButton.appendChild(buttonWeiter);
        buttonWeiter.addEventListener("click", link);
        function link() {
            document.location.href = _s;
        }
    }
    function createBildFinal(_id, _quelleStorage, _styleId, _nameStorage) {
        let _div = document.getElementById(_id);
        let _img = document.createElement("img");
        _img.setAttribute("id", "style" + _styleId + localStorage.getItem(_nameStorage));
        _img.setAttribute("src", localStorage.getItem(_quelleStorage));
        _div.appendChild(_img);
    }
    function addImages(_auswahlAktuell, _storedKoerperteil, _div, _koerperteilQuelleStorage, _koerperteilNameStorage, _styleKoerperteil, _linkNextPage) {
        let divChoice = document.getElementById(_auswahlAktuell);
        let choice = document.createElement("img");
        for (let i = 0; i < _storedKoerperteil.length; i++) {
            let divKoerperteil = document.getElementById(_div + String(i));
            let bildKoerperteil = document.createElement("img");
            bildKoerperteil.classList.add("Bilder");
            bildKoerperteil.setAttribute("src", _storedKoerperteil[i].quelle);
            bildKoerperteil.dataset.value = _storedKoerperteil[i].name;
            divKoerperteil.appendChild(bildKoerperteil);
            bildKoerperteil.addEventListener("click", auswahlBild);
            function auswahlBild() {
                let auswahlKoerperteil = _storedKoerperteil[i].quelle;
                let auswahlName = _storedKoerperteil[i].name;
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
    async function jsonLaden(_url) {
        let response = await fetch(_url);
        let data = await response.json();
        localStorage.setItem("dataKoepfe", JSON.stringify(data.koepfeJSON));
        localStorage.setItem("dataKoerper", JSON.stringify(data.koerperJSON));
        localStorage.setItem("dataBeine", JSON.stringify(data.beineJSON));
    }
    let koepfe = JSON.parse(localStorage.getItem("dataKoepfe"));
    let koerper = JSON.parse(localStorage.getItem("dataKoerper"));
    let beine = JSON.parse(localStorage.getItem("dataBeine"));
    let page = document.body.id;
    switch (page) {
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
            async function datenSenden(_url) {
                let query = new URLSearchParams(localStorage);
                _url = _url + "?" + query.toString();
                let response = await fetch(_url);
                let jsonAntwort = await response.json();
                let paragraph = document.getElementById("ausgabeNachricht");
                if (jsonAntwort.message != undefined) {
                    paragraph.appendChild(document.createTextNode(jsonAntwort.message));
                }
                else if (jsonAntwort.error != undefined) {
                    paragraph.setAttribute("id", "Fehler");
                    paragraph.appendChild(document.createTextNode(jsonAntwort.error));
                }
            }
            let kopfButtonLink = document.getElementById("kopfButton");
            let linkKopfSeite = document.createElement("button");
            linkKopfSeite.appendChild(document.createTextNode("nochmal"));
            kopfButtonLink.appendChild(linkKopfSeite);
            linkKopfSeite.addEventListener("click", link);
            function link() {
                localStorage.clear();
                document.location.href = "kopf.html";
            }
            datenSenden("https://gis-communication.herokuapp.com");
            createBildFinal("ergebnisKoerper", "quelleKoerperStorage", "Koerper", "nameKoerperStorage");
            createBildFinal("ergebnisBein", "quelleBeineStorage", "Beine", "nameBeineStorage");
            createBildFinal("ergebnisKopf", "quelleKopfStorage", "Kopf", "nameKopfStorage");
            break;
    }
})(Aufgabe2_3_2 || (Aufgabe2_3_2 = {}));
//# sourceMappingURL=script.js.map