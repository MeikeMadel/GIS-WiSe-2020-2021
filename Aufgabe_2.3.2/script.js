"use strict";
var Aufgabe2_3_2;
(function (Aufgabe2_3_2) {
    let kopfButtonLink = document.getElementById("kopfButton");
    let linkKopfSeite = document.createElement("button");
    linkKopfSeite.appendChild(document.createTextNode("Kopf"));
    kopfButtonLink.appendChild(linkKopfSeite);
    linkKopfSeite.addEventListener("click", linkKopf);
    function linkKopf() {
        document.location.href = "kopf.html";
    }
    let beineButtonLink = document.getElementById("beineButton");
    let linkBeineSeite = document.createElement("button");
    linkBeineSeite.appendChild(document.createTextNode("Beine"));
    beineButtonLink.appendChild(linkBeineSeite);
    linkBeineSeite.addEventListener("click", linkBeine);
    function linkBeine() {
        document.location.href = "beine.html";
    }
    let koerperButtonLink = document.getElementById("koerperButton");
    let linkKoerperSeite = document.createElement("button");
    linkKoerperSeite.appendChild(document.createTextNode("Körper"));
    koerperButtonLink.appendChild(linkKoerperSeite);
    linkKoerperSeite.addEventListener("click", linkKoerper);
    function linkKoerper() {
        document.location.href = "koerper.html";
    }
    let divKopf = document.getElementById("kopfDiv");
    let kopfBild = document.createElement("img");
    kopfBild.setAttribute("scr", "..Aufgabe_2.3.2/zebra-kopf.jpg");
    kopfBild.classList.add("Bilder");
    divKopf.appendChild(kopfBild);
    let divKoerper = document.getElementById("koerperDiv");
    let koerperBild = document.createElement("img");
    koerperBild.setAttribute("scr", "zebra-koerper.jpg");
    koerperBild.classList.add("Bilder");
    divKoerper.appendChild(koerperBild);
    let divBeine = document.getElementById("beineDiv");
    let beineBild = document.createElement("img");
    beineBild.setAttribute("scr", "zebra-beine.jpg");
    beineBild.classList.add("Bilder");
    divBeine.appendChild(beineBild);
})(Aufgabe2_3_2 || (Aufgabe2_3_2 = {}));
//# sourceMappingURL=script.js.map