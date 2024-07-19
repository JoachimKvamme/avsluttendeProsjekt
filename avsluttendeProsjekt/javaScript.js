let brukerUrl ="";
let brukerpos = ""
hentPosisjon()
darkModeStart()

function velgSted() {
    brukerUrl = document.getElementById("byer").value
    if (brukerUrl == "brukerpos") {
        brukerUrl = brukerpos
    }
}

function formatDato(datestring) {
    let aar = datestring.slice(0,4)
    let maaned = datestring.slice(5,7)
    let dag = datestring.slice(8, 10).trim()
    let time = datestring.slice(11,13).trim()
    let tekstmaaned = ""

    switch (maaned) {
        case "01":
            tekstmaaned = "januar"
            break
        case "02":
            tekstmaaned = "februar"
            break
        case "03":
            tekstmaaned = "mars"
            break
        case "04":
            tekstmaaned = "april"
            break
        case "05":
            tekstmaaned = "mai"
            break
        case "06":
            tekstmaaned = "juni"
            break
        case "07":
            tekstmaaned = "juli"
            break
        case "08":
            tekstmaaned = "august"
            break
        case "09":
            tekstmaaned = "september"
            break
        case "10":
            tekstmaaned = "oktober"
            break
        case "11":
            tekstmaaned = "november"
            break
        case "12":
            tekstmaaned = "desember"
            break
        default:
            console.log("Datostrengen passer ikke i denne funksjonen")
    }
    let datouttrykk = 
    `${dag}. ${tekstmaaned} <br>
    klokken ${time}`
    return datouttrykk
}

async function visVæret() {
    try {

        try {document.getElementById("resVærListe").remove()}
        catch {console.log("Det var ingenting å slette/noe gikk galt.")}
        let liste = document.createElement("ul")
        document.getElementById("resVær").appendChild(liste)
        liste.setAttribute("class", "liste")
        liste.setAttribute("id", "resVærListe")
        let værdata = await hentVæret()
        console.log(værdata.properties.timeseries)
        værdata.properties.timeseries.forEach(væretBergen => {
            let logo = `../weathericons/weather/svg/${væretBergen.data.next_12_hours.summary.symbol_code}.svg`
            let listeelement = document.createElement("li")
            document.getElementById("resVærListe").appendChild(listeelement)
            listeelement.innerHTML += 
            `<h2>${formatDato(væretBergen.time)} </h2>
                <div class="listeinnhold">
                    <p>Gjennomsnittstemperatur: ${væretBergen.data.instant.details.air_temperature}</p>
                    <p>Nedbør: ${væretBergen.data.next_1_hours.details.precipitation_amount} mm</p>
                    <p><img src="${logo}" alt="Værlogo" width="50px" heigth="50px"></p>
                    
                </div>
                <div class="cta">
                    <a href="">Mer informasjon</a>
                </div>`


            /*document.getElementById("resVær").innerHTML +=
            `
            <li>
                <h2>Tidspunkt: ${væretBergen.time} </h2>
                <div class="listeinnhold">
                    <p>Gjennomsnittstemperatur: ${væretBergen.data.instant.details.air_temperature}</p>
                    <p>Nedbør: ${væretBergen.data.next_1_hours.details.precipitation_amount} mm</p>
                    <p><img src="${logo}" alt="Værlogo" width="50px" heigth="50px"></p>
                    
                </div>
                <div class="cta">
                    <a href="">Call to action! (Hva?)</a>
                </div>
            </li>`

            /*Dato: ${væretBergen.time}
            Høyeste temperatur: ${væretBergen.data.next_24_hours.details.air_temperature_max}
            Laveste temperatur: ${væretBergen.data.next_24_hours.details.air_temperature_min}
            Gjennomsnittstemperatur: ${væretBergen.data.next_24_hours.details.air_temperature_mean}
            Sjanse for regn: ${væretBergen.data.next_24_hours.details.probability_of_precipitation}
            Nedbørsmengde: ${væretBergen.data.next_24_hours.details.precipitation_amount}*/


            
        });
        

    } catch {
        console.log("Noe gikk galt med å vise været")
    }
}


async function hentVæret() {
    try {
        url = brukerUrl
        console.log("her er url",url)
        //let url = "https://api.met.no/weatherapi/subseasonal/1.0/complete?lat=60.3929&lon=5.3241"
        //let url = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.3929&lon=5.3241"
        let res = await fetch(url)
        let data = await res.json()
        console.log(data)
        return data
    } catch {
        console.log("Noe gikk galt med å hente dataene")
    }
}

async function hentPosisjon() {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude)
        //brukerpos = `https://api.met.no/weatherapi/subseasonal/1.0/complete?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        brukerpos = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        console.log("jeg er frisk",brukerUrl)
      });
}

function darkModeToggle() {
    let dark = 1

    if (localStorage.getItem("darkmode") != 1){
        localStorage.setItem("darkmode", dark)
    }
    else {
        localStorage.setItem("darkmode", 0)
    }

}

async function darkModeStart() {
    let brukervalg = localStorage.getItem("darkmode")

    let element = document.body

    if (brukervalg == 1) {
        element.classList.toggle("dark-mode")
        document.getElementById("hoved-nav").classList.toggle("hoved-nav")
        document.getElementById("hoved-nav").classList.toggle("hoved-nav-dark")
    }
}

function darkmode() {

    let element = document.body
    element.classList.toggle("dark-mode")
    document.getElementById("hoved-nav").classList.toggle("hoved-nav")
    document.getElementById("hoved-nav").classList.toggle("hoved-nav-dark")

}
document.getElementById("darkmode").addEventListener("click", darkModeToggle)
document.getElementById("darkmode").addEventListener("click", darkmode)

let menu = document.querySelector(".navliste");
const menuItems = document.querySelectorAll(".navliste-element");
let hamburger= document.querySelector(".hamburger");
let closeIcon= document.querySelector(".closeIcon");
let menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
    menuItems.forEach( 
        function(menuItem) { 
          menuItem.addEventListener("click", toggleMenu);
        }
      )
  }
}

hamburger.addEventListener("click", toggleMenu);

function hjem() {
    window.location.replace("index.html")
}