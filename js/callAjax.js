
//  Fonction qui effectue une requête Ajax
var callAjax = function(url, callBack){

    // Déclaration des variables
    var city__nameEl = document.querySelector('.city__name'),
    dateEl = document.querySelector('.date'),
    tempEl = document.querySelector('.temp__'),
    temp__minEl = document.querySelector('.temp__min'),
    temp__maxEl = document.querySelector('.temp__max'),
    weather__descriptionEl = document.querySelector('.weather__description'),
    month = ['Jan', 'Feb', 'Mar', 'Apr', 'may', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    date = new Date(),
    currentDate = `${day[date.getDay()]} ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`,
    humidityElt = document.querySelector('.humidity'),
    pressure = document.querySelector('.pressure'),
    images__descr = document.querySelector('.section_2');

    // Création de la requête HTTP
    var xhr = new XMLHttpRequest();

    // Préparation de la requête
    xhr.open('GET', url, true);


    xhr.addEventListener('load', function(){
        if(xhr.status >= 200 && xhr.status < 400) {   // Si la reponse du serveur est un succès

            var res = JSON.parse(xhr.responseText); //On recupere la reponse sous format JSON

            if (callBack) {
                callBack(res);
            }else{
                // On charge les données recues dans la 
                city__nameEl.innerHTML = `<svg class="localisation__icon" version="1.1" id="Capa_1"  x="0px" y="0px" width="38px" height="38px" viewBox="0 0 38 38" style="enable-background:new 0 0 38 38;" xml:space="preserve">
                <g><path d="M19,0C11.096,0,4.666,6.43,4.666,14.333c0,11.379,12.796,22.81,13.341,23.292C18.292,37.875,18.646,38,19,38 c0.368,0,0.736-0.135,1.023-0.404c0.543-0.508,13.311-12.568,13.311-23.262C33.334,6.431,26.902,0,19,0z M19,21.168 c-3.775,0-6.834-3.061-6.834-6.833S15.225,7.502,19,7.502c3.773,0,6.832,3.06,6.832,6.833S22.773,21.168,19,21.168z"/></g></svg>${res.name} <sup>${res.sys.country}</sup>`;
                dateEl.innerHTML = `<img src="images/calendar-spring-and-squares-interface-symbol.svg" alt="data">${currentDate}`;
                tempEl.innerHTML = `${res.main.temp}°`;
                temp__minEl.innerHTML = `<img src='images/temperature.svg'> min : ${res.main.temp_min}°c`;
                temp__maxEl.innerHTML = `<img src='images/temperature.svg'> max : ${res.main.temp_max}°c`;
                weather__descriptionEl.innerHTML = res.weather[0].description;
                images__descr.style.backgroundImage = `url('images/${res.weather[0].description.split(' ')[0]}.jpg')`;
                humidityElt.innerHTML = `<img src='images/humidity.svg'> Humidity : ${res.main.humidity}`;
                pressure.innerHTML = `<img src='images/gauge.svg'> Pressure : ${res.main.pressure}`;
            }

        }else { // Sinon on affiche une erreur
            console.error(`Erreur ${xhr.status} : ${xhr.statusText}`);
            // document.querySelector('.results').innerHTML = '404';
            // var resulterror = document.querySelector('.results');
            // resulterror.classList.remove('results')
            // resulterror.classList.add('eror');
            document.querySelector('.eror').style.transform = 'scale(1)';
        }
    });

    //En cas  d'erreur avec le serveur
    xhr.addEventListener('error', function(){   
        console.error(`Erreur réseau sur l\'url ${url}`);
    });

    // On envoi enfin la requête
    xhr.send(null);
}