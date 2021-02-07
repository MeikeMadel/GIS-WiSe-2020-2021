
namespace AstAVerleih {
    let url: string = "https://giswise20202021.herokuapp.com";

    let fname: HTMLInputElement = <HTMLInputElement>document.getElementById("fname");
    let lname: HTMLInputElement = <HTMLInputElement>document.getElementById("lname");
    let email: HTMLInputElement = <HTMLInputElement>document.getElementById("email");
    let form: HTMLFormElement = <HTMLFormElement> document.getElementById("formular");
    let serverAntwort: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("serverAntwort");
    let buttonSenden: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button");
    buttonSenden.addEventListener("click", sendData);

    function checkForm(): boolean {
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
        else if (email.value == "" || !email.value.endsWith("@hs-furtwangen.de")) {
            alert("Es ist eine gültige Email-Adresse der Hochschule Furtwangen erforderlich"); //"gültig" durch Format, nicht dass überprüft wird, dass sie wirklich vorhanden ist
            location.reload();
            return false;
        }
        else {
            return true;
        }
    }

    async function sendData(_event: Event): Promise<void> {
        console.log(localStorage.ausgeliehen);
        if (checkForm()) {
            if (localStorage.ausgeliehen != undefined) {
                console.log(localStorage.ausgeliehen);
                let formData: FormData = new FormData(form);
                let query: URLSearchParams = new URLSearchParams(<any>formData);
                url = url + "reservierung/send" + "?" + query.toString() + localStorage.ausgeliehen;
                let response: Response = await fetch(url);
                let responseText: string = await response.text();
                serverAntwort.appendChild(document.createTextNode(responseText));
                form.reset();
                localStorage.clear();
                //Status von Objekt wird in Server auf reserviert geändert und Name Attribut wird Name eingetragen (sonst ist Name leerer String)
            }
            else {
                serverAntwort.appendChild(document.createTextNode("Es wurde kein Artikel zur Reservierung ausgewählt"));
                form.reset();
            }

        }
    }

}