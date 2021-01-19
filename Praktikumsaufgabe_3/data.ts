
namespace P_3Data { 
    window.addEventListener("load", handleLoad);
    let url: string = "http://localhost:8100"; //später Heroku server einsetzen
    let page: string = document.body.id;


    function handleLoad(): void {

        switch (page) {
            case "anmeldungPage": 
               console.log("Anmeldungsseite");

               let form: HTMLFormElement = <HTMLFormElement>document.getElementById("formular");
               form.addEventListener("change", handleChange);

               let buttonSenden: HTMLButtonElement = <HTMLButtonElement>document.getElementById("sendData");
               buttonSenden.addEventListener("click", sendData);

               let divEmail: HTMLElement = <HTMLElement>document.getElementById("emailVorhanden");
               let serverAntwort: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");


               function handleChange(_event: Event): void {
                console.log(form.value);
               }

               async function sendData(_event: Event): Promise<void> {
                  _event.preventDefault();
                  let formData: FormData = new FormData(form);
                  let query: URLSearchParams = new URLSearchParams(<any>formData);
                  url = url + "/send" + "?" + query.toString();
                  let response: Response = await fetch(url);
                  let responseText: string = await response.text();
                  serverAntwort.appendChild(document.createTextNode(responseText));
                  divEmail.appendChild(serverAntwort);
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
                    let responseText: string = await response.text();
                    console.log(responseText);
                    //let jsObject: string = JSON.stringify(responseText);
                    user.appendChild(document.createTextNode(responseText));
                    divUser.appendChild(user);
                }
                break;

            case "loginPage":
                console.log("Loginseite");

                let formular: HTMLFormElement = <HTMLFormElement>document.getElementById("logInFormular");

                let buttonLogin: HTMLButtonElement = <HTMLButtonElement>document.getElementById("logInButton");
                buttonLogin.addEventListener("click", loginData);
                
                let divLogin: HTMLElement = <HTMLElement>document.getElementById("loginAusgabe");
                let userLogin: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                
                async function loginData(_event: Event): Promise<void> {
                  _event.preventDefault();
                  let formData: FormData = new FormData(formular);
                  let query: URLSearchParams = new URLSearchParams(<any>formData);
                  url = url + "/login" + "?" + query.toString();
                  let response: Response = await fetch(url);
                  let responseText: string = await response.text();
                  userLogin.appendChild(document.createTextNode(responseText));
                  divLogin.appendChild(userLogin);
                }
                break;
        }
    }
    
}
    
    

