
namespace P_3Data { 
    window.addEventListener("load", handleLoad);
    let url: string = "https://giswise20202021.herokuapp.com"; 
    let page: string = document.body.id;


    function handleLoad(): void {

        let fname: HTMLInputElement = <HTMLInputElement>document.getElementById("fname");
        let lname: HTMLInputElement = <HTMLInputElement>document.getElementById("lname");
        let ort: HTMLInputElement = <HTMLInputElement>document.getElementById("wohnort");
        let email: HTMLInputElement = <HTMLInputElement>document.getElementById("email");
        let passwort: HTMLInputElement = <HTMLInputElement>document.getElementById("passwort");

        switch (page) {
            case "anmeldungPage": 
               console.log("Anmeldungsseite");

               let form: HTMLFormElement = <HTMLFormElement>document.getElementById("formular");

               let buttonSenden: HTMLButtonElement = <HTMLButtonElement>document.getElementById("sendData");
               buttonSenden.addEventListener("click", sendData);

               let divEmail: HTMLElement = <HTMLElement>document.getElementById("emailVorhanden");
               let serverAntwort: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");

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
                else if (ort.value == "") {
                  alert("Wohnort erforderlich");
                  location.reload();
                  return false;
                }
                else if (email.value == "") {
                  alert("Email erforderlich");
                  location.reload();
                  return false;
                }
                else if (passwort.value == "") {
                  alert("Passwort erforderlich");
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
                    let formData: FormData = new FormData(form);
                    let query: URLSearchParams = new URLSearchParams(<any>formData);
                    url = url + "/send" + "?" + query.toString();
                    let response: Response = await fetch(url);
                    let responseText: string = await response.text();
                    form.reset();
                    serverAntwort.appendChild(document.createTextNode(responseText));
                    divEmail.appendChild(serverAntwort);   
                  }
               }
               break;

            case "userPage":
                console.log("Userseite");

                let buttonShow: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showDataButton");
                buttonShow.addEventListener("click", showData);
                
                let divUser: HTMLElement = <HTMLElement>document.getElementById("userAusgabe");
                let user: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                
                async function showData(_event: Event): Promise<void> {
                    _event.preventDefault();
                    url = url + "/show";
                    let response: Response = await fetch(url);
                    let responseText = await response.text();
                    console.log(responseText);
                    user.appendChild(document.createTextNode(responseText));
                    divUser.appendChild(user);
                }
                break;

            case "loginPage":
            
                let formular: HTMLFormElement = <HTMLFormElement>document.getElementById("logInFormular");

                let buttonLogin: HTMLButtonElement = <HTMLButtonElement>document.getElementById("logInButton");
                buttonLogin.addEventListener("click", loginData);
                
                let divLogin: HTMLElement = <HTMLElement>document.getElementById("loginAusgabe");
                let userLogin: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                
                async function loginData(_event: Event): Promise<void> {
                  console.log("Loginseite");
                  if (email.value == "") {
                      alert("Email erforderlich");
                      location.reload();
                  }
                  if (passwort.value == "") {
                       alert("Passwort erforderlich");
                       location.reload();
                  }
                  let formData: FormData = new FormData(formular);
                  let query: URLSearchParams = new URLSearchParams(<any>formData);
                  url = url + "/login" + "?" + query.toString();
                  let response: Response = await fetch(url);
                  let responseText: string = await response.text();
                  formular.reset();
                  userLogin.appendChild(document.createTextNode(responseText));
                  divLogin.appendChild(userLogin);
                }
                break;
        }
    }
    
}
    
    

