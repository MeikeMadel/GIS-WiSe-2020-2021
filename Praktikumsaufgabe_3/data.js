"use strict";
var P_3Data;
(function (P_3Data) {
    window.addEventListener("load", handleLoad);
    let url = "https://giswise20202021.herokuapp.com";
    let page = document.body.id;
    function handleLoad() {
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        let ort = document.getElementById("wohnort");
        let email = document.getElementById("email");
        let passwort = document.getElementById("passwort");
        switch (page) {
            case "anmeldungPage":
                console.log("Anmeldungsseite");
                let form = document.getElementById("formular");
                let buttonSenden = document.getElementById("sendData");
                buttonSenden.addEventListener("click", sendData);
                let divEmail = document.getElementById("emailVorhanden");
                let serverAntwort = document.createElement("p");
                async function sendData(_event) {
                    _event.preventDefault();
                    if (fname.value == "") {
                        alert("Nachname erforderlich");
                        location.reload();
                    }
                    else if (lname.value == "") {
                        alert("Nachname erforderlich");
                        location.reload();
                    }
                    else if (ort.value == "") {
                        alert("Wohnort erforderlich");
                        location.reload();
                    }
                    else if (email.value == "") {
                        alert("Email erforderlich");
                        location.reload();
                    }
                    else if (passwort.value == "") {
                        alert("Passwort erforderlich");
                        location.reload();
                    }
                    let formData = new FormData(form);
                    let query = new URLSearchParams(formData);
                    url = url + "/send" + "?" + query.toString();
                    let response = await fetch(url);
                    let responseText = await response.text();
                    form.reset();
                    serverAntwort.appendChild(document.createTextNode(responseText));
                    divEmail.appendChild(serverAntwort);
                }
                break;
            case "userPage":
                console.log("Userseite");
                let buttonShow = document.getElementById("showDataButton");
                buttonShow.addEventListener("click", showData);
                let divUser = document.getElementById("userAusgabe");
                let user = document.createElement("p");
                async function showData(_event) {
                    _event.preventDefault();
                    url = url + "/show";
                    let response = await fetch(url);
                    let responseText = await response.text();
                    console.log(responseText);
                    user.appendChild(document.createTextNode(responseText));
                    divUser.appendChild(user);
                }
                break;
            case "loginPage":
                let formular = document.getElementById("logInFormular");
                let buttonLogin = document.getElementById("logInButton");
                buttonLogin.addEventListener("click", loginData);
                let divLogin = document.getElementById("loginAusgabe");
                let userLogin = document.createElement("p");
                async function loginData(_event) {
                    console.log("Loginseite");
                    if (email.value == "") {
                        alert("Email erforderlich");
                        location.reload();
                    }
                    if (passwort.value == "") {
                        alert("Passwort erforderlich");
                        location.reload();
                    }
                    let formData = new FormData(formular);
                    let query = new URLSearchParams(formData);
                    url = url + "/login" + "?" + query.toString();
                    let response = await fetch(url);
                    let responseText = await response.text();
                    formular.reset();
                    userLogin.appendChild(document.createTextNode(responseText));
                    divLogin.appendChild(userLogin);
                }
                break;
        }
    }
})(P_3Data || (P_3Data = {}));
//# sourceMappingURL=data.js.map