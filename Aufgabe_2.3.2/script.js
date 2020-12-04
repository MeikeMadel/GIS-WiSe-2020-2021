"use strict";
var Aufgabe2_3_2;
(function (Aufgabe2_3_2) {
    auswahlJSONkonvertieren();
    function auswahlJSONkonvertieren() {
        let koepfe = JSON.parse(koepfeAuswahlJSON);
        console.log(koepfe[0].name);
        let koerper = JSON.parse(koerperAuswahlJSON);
        console.log(koerper[0].name);
        let beine = JSON.parse(beineAuswahlJSON);
        console.log(beine[0].name);
    }
    let koepfe = JSON.parse(koepfeAuswahlJSON);
    let koerper = JSON.parse(koerperAuswahlJSON);
    let beine = JSON.parse(beineAuswahlJSON);
    /*
    communicate("https://github.com/MeikeMadel/GIS-WiSe-2020-2021/blob/main/Aufgabe_2.3.2/data.json");
    
    function communicate(_url: RequestInfo): void {
        let promise: Promise<Response> = fetch(_url);
        promise.then(handleSuccess, handleFailure);
      }
      
    function handleFailure(_response: Response): void {
        console.log("Failure", _response);
      }
      
    function handleSuccess(_response: Response): void {
        console.log("Success", _response);
      }
    */
    function weiterButton(_s, _testStorage) {
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
                document.location.href = _s;
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
    let page = document.body.id;
    switch (page) {
        case "kopfseite":
            weiterButton("koerper.html", "quelleKopfStorage");
            let divChoice = document.getElementById("auswahlaktuell");
            let choice = document.createElement("img");
            for (let i = 0; i < koepfe.length; i++) {
                let divKopf = document.getElementById("kopfDiv" + String(i));
                let bildKopf = document.createElement("img");
                bildKopf.classList.add("Bilder");
                bildKopf.setAttribute("src", koepfe[i].quelle);
                bildKopf.dataset.value = koepfe[i].name;
                divKopf.appendChild(bildKopf);
                bildKopf.addEventListener("click", auswahlBild);
                function auswahlBild() {
                    let auswahlKopf = koepfe[i].quelle;
                    let auswahlName = koepfe[i].name;
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
            let divChoice2 = document.getElementById("auswahlaktuell2");
            let choice2 = document.createElement("img");
            for (let i = 0; i < koerper.length; i++) {
                let b = i;
                let divKoerper = document.getElementById("koerperDiv" + String(b));
                let bildKoerper = document.createElement("img");
                bildKoerper.classList.add("Bilder");
                bildKoerper.setAttribute("src", koerper[i].quelle);
                bildKoerper.dataset.value = koerper[i].name;
                divKoerper.appendChild(bildKoerper);
                bildKoerper.addEventListener("click", linkBeine);
                function linkBeine() {
                    let auswahlKoerper = koerper[i].quelle;
                    let auswahlName = koerper[i].name;
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
            let divChoice3 = document.getElementById("auswahlaktuell3");
            let choice3 = document.createElement("img");
            for (let i = 0; i < beine.length; i++) {
                let a = i;
                let divBeine = document.getElementById("beineDiv" + String(a));
                let bildBeine = document.createElement("img");
                bildBeine.classList.add("Bilder");
                bildBeine.setAttribute("src", beine[i].quelle);
                bildBeine.dataset.value = beine[i].name;
                divBeine.appendChild(bildBeine);
                bildBeine.addEventListener("click", linkStartseite);
                function linkStartseite() {
                    let auswahlBeine = beine[i].quelle;
                    let auswahlName = beine[i].name;
                    localStorage.setItem("nameBeineStorage", auswahlName);
                    localStorage.setItem("quelleBeineStorage", auswahlBeine);
                    choice3.setAttribute("src", localStorage.getItem("quelleBeineStorage"));
                    choice3.setAttribute("id", "styleBeine" + localStorage.getItem("nameBeineStorage"));
                    divChoice3.appendChild(choice3);
                }
            }
            break;
        case "ende":
            let kopfButtonLink = document.getElementById("kopfButton");
            let linkKopfSeite = document.createElement("button");
            linkKopfSeite.appendChild(document.createTextNode("nochmal"));
            kopfButtonLink.appendChild(linkKopfSeite);
            linkKopfSeite.addEventListener("click", linkKopf);
            function linkKopf() {
                localStorage.clear();
                document.location.href = "kopf.html";
            }
            createBildFinal("ergebnisKoerper", "quelleKoerperStorage", "Koerper", "nameKoerperStorage");
            createBildFinal("ergebnisBein", "quelleBeineStorage", "Beine", "nameBeineStorage");
            createBildFinal("ergebnisKopf", "quelleKopfStorage", "Kopf", "nameKopfStorage");
            break;
    }
})(Aufgabe2_3_2 || (Aufgabe2_3_2 = {}));
//# sourceMappingURL=script.js.map