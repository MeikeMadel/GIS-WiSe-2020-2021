
namespace P_3_1Data { 
    window.addEventListener("load", handleLoad);
    let url: string = "http://localhost:8100";
    let form: HTMLFormElement;


    function handleLoad(): void {
        console.log("Seite geladen");

        form = <HTMLFormElement>document.querySelector("form");
        
        form.addEventListener("change", handleChange);

        let senden: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button");
        senden.addEventListener("click", datenSenden);


        function handleChange(_event: Event): void {
          console.log(form.name);
        }

        async function datenSenden(_event: Event): Promise<void> {
            console.log("Formular senden");
            let formData: FormData = new FormData(form);
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            url = url + "?" + query.toString
            let response: Response = await fetch(url);
            let responseText: string = await response.text();
            alert(responseText);
        }

    
    }
         /*
        async function datenSenden(_event: Event): Promise<void> {
            console.log("Formular senden");
            let formData: FormData = new FormData(form);
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            let response: Response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                  },
                body: JSON.stringify(query)
            });
            let responseJSON = await response.json();
            alert(responseJSON.message);
        }
       
        
        async function handleSubmit(_event: Event): Promise<void> {
            _event.preventDefault();

            let formData: FormData = new FormData(form);
            let response: Response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify(formData)
            });
            //let responseJSON: string = await response.json();
            console.log(response);

        }
*/
    
        /*
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let formData = new FormData(this); //based on this --> form itself
            fetch(url, {
                method: "POST", 
                body: formData
            }).then(function (response) {
                return response.text();
            }).then(function(text) {
                console.log(text);
            }).catch(function (error){
                console.log(error);
            }
            );
        });

        .then((response) => response.json()).then((data) => {
            console.log("Success:", data);
        }).catch((error) => {
            console.error("Error", error);
        });
    }
        let response: Response = await fetch(url + "?" + query.toString);
        let responseText: string = await response.text();
        alert (responseText);
    
       
    }
    */ 
    
}
