"use strict";
var P_3Data;
(function (P_3Data) {
    window.addEventListener("load", handleLoad);
    let url = "https://giswise20202021.herokuapp.com"; //später Heroku server einsetzen
    let page = document.body.id;
    function handleLoad() {
        switch (page) {
            case "anmeldungPage":
                console.log("Anmeldungsseite");
                let form = document.getElementById("formular");
                form.addEventListener("change", handleChange);
                let buttonSenden = document.getElementById("sendData");
                buttonSenden.addEventListener("click", sendData);
                let divEmail = document.getElementById("emailVorhanden");
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
                    //let jsObject: string = JSON.stringify(responseText);
                    user.appendChild(document.createTextNode(responseText));
                    divUser.appendChild(user);
                }
                break;
            case "loginPage":
                console.log("Loginseite");
                let formular = document.getElementById("logInFormular");
                let buttonLogin = document.getElementById("logInButton");
                buttonLogin.addEventListener("click", loginData);
                let divLogin = document.getElementById("loginAusgabe");
                let userLogin = document.createElement("p");
                async function loginData(_event) {
                    _event.preventDefault();
                    let formData = new FormData(formular);
                    let query = new URLSearchParams(formData);
                    url = url + "/login" + "?" + query.toString();
                    let response = await fetch(url);
                    let responseText = await response.text();
                    userLogin.appendChild(document.createTextNode(responseText));
                    divLogin.appendChild(userLogin);
                }
                break;
        }
    }
})(P_3Data || (P_3Data = {}));
//# sourceMappingURL=data.js.map