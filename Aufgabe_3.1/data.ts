
namespace P_3_1Data { 
    window.addEventListener("load", handleLoad);
    let url: string = "http://localhost:8100";
    let form: HTMLFormElement;


    function handleLoad(): void {
        console.log("Seite geladen");

        form = <HTMLFormElement>document.querySelector("form");
        
        form.addEventListener("change", handleChange);

        let buttonSenden: HTMLButtonElement = <HTMLButtonElement>document.getElementById("sendData");
        buttonSenden.addEventListener("click", sendData);

        let buttonStore: HTMLButtonElement = <HTMLButtonElement>document.getElementById("storeData");
        buttonStore.addEventListener("click", storeData);

        let divAusgabe: HTMLElement = <HTMLElement>document.getElementById("serverAntwort");
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
            console.log(responseText);
        }


        async function storeData(_event: Event): Promise<void> {
            _event.preventDefault();
            let formData: FormData = new FormData(form);
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            url = url + "/store" + "?" + query.toString();
            let response: Response = await fetch(url);
            let responseText: string = await response.text();
            console.log(responseText);
            //let jsObject: string = JSON.stringify(responseText);
            serverAntwort.appendChild(document.createTextNode(responseText));
            divAusgabe.appendChild(serverAntwort);
        }
    }
    
}
    
    

