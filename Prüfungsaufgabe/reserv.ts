
namespace AstAVerleih {
    let url: string = "http://localhost:8100";

    let fname: HTMLInputElement = <HTMLInputElement>document.getElementById("fname");
    let lname: HTMLInputElement = <HTMLInputElement>document.getElementById("lname");
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
        else {
            return true;
        }
    }

    async function sendData(_event: Event): Promise<void> {
        _event.preventDefault();
        if (checkForm()) {
            if (localStorage.ausgeliehen != undefined) {
                let formData: FormData = new FormData(form);
                let query: URLSearchParams = new URLSearchParams(<any>formData);
                url = url + "/send" + "?" + query.toString() + localStorage.ausgeliehen;
                localStorage.clear();
                let response: Response = await fetch(url);
                let responseText: string = await response.text();
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

}