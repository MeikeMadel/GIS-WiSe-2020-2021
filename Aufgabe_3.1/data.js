"use strict";
var P_3_1Data;
(function (P_3_1Data) {
    window.addEventListener("load", handleLoad);
    let url = "https://giswise20202021.herokuapp.com";
    let form;
    function handleLoad() {
        console.log("Seite geladen");
        form = document.querySelector("form");
        form.addEventListener("change", handleChange);
        let buttonSenden = document.getElementById("sendData");
        buttonSenden.addEventListener("click", sendData);
        let buttonStore = document.getElementById("storeData");
        buttonStore.addEventListener("click", storeData);
        let divAusgabe = document.getElementById("serverAntwort");
        let serverAntwort = document.createElement("p");
        function handleChange(_event) {
            console.log(form.value);
        }
        async function sendData(_event) {
            _event.preventDefault();
            let formData = new FormData(form);
            let query = new URLSearchParams(formData);
            url = url + "/send" + "?" + query.toString();
            let response = await fetch(url);
            let responseText = await response.text();
            console.log(responseText);
        }
        async function storeData(_event) {
            _event.preventDefault();
            let formData = new FormData(form);
            let query = new URLSearchParams(formData);
            url = url + "/store" + "?" + query.toString();
            let response = await fetch(url);
            let responseText = await response.text();
            let jsObject = JSON.stringify(responseText);
            serverAntwort.appendChild(document.createTextNode(jsObject));
            divAusgabe.appendChild(serverAntwort);
        }
    }
})(P_3_1Data || (P_3_1Data = {}));
//# sourceMappingURL=data.js.map