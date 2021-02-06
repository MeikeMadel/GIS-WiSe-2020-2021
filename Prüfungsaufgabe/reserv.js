"use strict";
var AstAVerleih;
(function (AstAVerleih) {
    let url = "http://localhost:8100";
    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let form = document.getElementById("formular");
    let serverAntwort = document.getElementById("serverAntwort");
    let buttonSenden = document.getElementById("button");
    buttonSenden.addEventListener("click", sendData);
    function checkForm() {
        if (fname.value == "") {
            alert("Vorname erforderlich");
            location.reload();
            return false;
        }
        else if (lname.value == "") {
            alert("Nachname erforderlich");
            location.reload();
            return false;
        }
        else {
            return true;
        }
    }
    async function sendData(_event) {
        _event.preventDefault();
        if (checkForm()) {
            if (localStorage.ausgeliehen != undefined) {
                let formData = new FormData(form);
                let query = new URLSearchParams(formData);
                url = url + "/send" + "?" + query.toString() + localStorage.ausgeliehen;
                localStorage.clear();
                let response = await fetch(url);
                let responseText = await response.text();
                serverAntwort.appendChild(document.createTextNode(responseText));
                form.reset();
                //Status von Objekt wird in Server auf reserviert geändert und Name Attribut wird Name eingetragen (sonst ist Name leerer String)
            }
            else {
                serverAntwort.appendChild(document.createTextNode("Es wurde kein Artikel zur Reservierung ausgewählt"));
                form.reset();
            }
        }
    }
})(AstAVerleih || (AstAVerleih = {}));
//# sourceMappingURL=reserv.js.map