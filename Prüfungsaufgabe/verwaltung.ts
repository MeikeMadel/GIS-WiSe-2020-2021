namespace AstAVerleih {

    window.addEventListener("load", handleLoad);
    let url: string = "http://localhost:8100";

 
    
    async function handleLoad(): Promise<void> {
        url = url + "/verwaltung";
        let response: Response = await fetch(url);
        let responseText: string = await response.text();
        let jsonResponse: Array<Artikel> = JSON.parse(responseText);
        for (let i: number = 0; i < jsonResponse.length; i++) {
            let divData: HTMLElement = document.getElementById("data");
            let div: HTMLDivElement = <HTMLDivElement> document.createElement("div");
            let titelElement: HTMLHeadingElement = document.createElement("h2");
            let buttonFrei: HTMLButtonElement = document.createElement("button");
            let buttonAusg: HTMLButtonElement = document.createElement("button");
            let buttonReserv: HTMLButtonElement = document.createElement("button");        
            let titelArikel: string = jsonResponse[i].titel;
            div.setAttribute("class", "divArtikel");
            titelElement.appendChild(document.createTextNode(titelArikel));
            let fname: string = jsonResponse[i].fname;
            let lname: string = jsonResponse[i].lname;
            buttonFrei.addEventListener("click", handleClickFrei);
            buttonFrei.appendChild(document.createTextNode("frei"));
            buttonAusg.addEventListener("click", handleClickAusleihen);
            buttonAusg.appendChild(document.createTextNode("ausgeliehen"));
            //braucht keinen Eventlistener, weil es automatisch auf reserviert steht durch geschickte Daten von ArtikelVerleih seite
            buttonReserv.appendChild(document.createTextNode("reserviert"));
            buttonReserv.setAttribute("class", "styleButtonReserv");
            div.appendChild(titelElement);
            div.appendChild(buttonFrei);
            div.appendChild(buttonAusg);
            div.appendChild(buttonReserv);
            if (jsonResponse[i].status == "frei") {
                buttonFrei.setAttribute("class", "frei");
            }
            else if (jsonResponse[i].status == "ausgeliehen") {
                buttonAusg.setAttribute("class", "ausgeliehen");
                buttonFrei.addEventListener("mouseover", mouseOver);
            }
            else if (jsonResponse[i].status == "reserviert") {
                buttonReserv.setAttribute("class", "reserviert");
                buttonAusg.addEventListener("mouseover", mouseOverAusge);
            }
            if (jsonResponse[i].status == "ausgeliehen" || jsonResponse[i].status == "reserviert") { //Namen hinzufügen, wenn einer vorhanden
                let name: HTMLParagraphElement = document.createElement("p");
                name.appendChild(document.createTextNode("Von " + fname + " " + lname));
                div.appendChild(name);
            }
            divData.appendChild(div);
       
            
            async function handleClickAusleihen(_event: Event): Promise<void> {
                //An Datenbank senden, dass status von Artikel in ausgeliehen geändert wird, aber nur wenn auf reserviert
                if (jsonResponse[i].status == "reserviert") {
                    url = url + "/ausleihen" + "?" + "titel=" + titelArikel;
                    location.reload();
                    await fetch(url);
                }
            }

            async function handleClickFrei(_event: Event): Promise<void> {
                if (jsonResponse[i].status == "ausgeliehen") {
                    url = url + "/frei" + "?" + "titel=" + titelArikel;
                    location.reload(); //dass Name gleich entfernt wird 
                    await fetch(url);
                    
                } //verhindern, dass was passiert, wenn Artikel eh schon frei ist oder reserviert, reservierte Artikel können nicht frei werden
                //braucht nur den Titel um Artikel durch titel zu suchen und Status auf frei zu setzen und Name in leeren string zu ändern
            }
            
            function mouseOver(_event: Event): void {
                buttonFrei.setAttribute("class", "hoverFrei");
            }

            function mouseOverAusge(_event: Event): void {
                buttonAusg.setAttribute("class", "hoverAusgeh");
            }
        }

            
    }
    
}
