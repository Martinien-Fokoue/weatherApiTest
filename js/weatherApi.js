//https://api.openweathermap.org/data/2.5/weather?q=douala&units=metric&appid=7f58d04f85c260780395fe38654c1694
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    
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
    input = document.querySelector('#input__search'),
    autocompleteElt = document.querySelector('.autocomplete'),
    data__resultsEl = document.querySelector('.data__results'),
    button = document.querySelector('.btn');


input.addEventListener('click', function(e){
    e.stopPropagation();
})
document.addEventListener('click', function(e){
    autocompleteElt.classList.remove('js__active__autocomplete');
    autocompleteElt.innerHTML = '';
    input.value = '';
});

button.addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    callAjax(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=7f58d04f85c260780395fe38654c1694`)
    autocompleteElt.classList.remove('js__active__autocomplete');
    document.querySelector('.eror').style.transform = 'scale(0)';
    autocompleteElt.innerHTML = '';
    input.value = '';
});

input.addEventListener('keyup', function(e){
    if (this.value.length >= 3) {
    autocompleteElt.innerHTML = '';
        callAjax('villes.json', function(res){
            for (let i = 0; i < res.length; i++) {
                const city = res[i].name.substring(0, e.target.value.length);
                if (city.toLowerCase() === e.target.value.toLowerCase()) {
                    autocompleteElt.classList.add('js__active__autocomplete');
                    // console.log(res[i].name);
                    var autocompleteItem = document.createElement('div');
                    autocompleteItem.innerHTML = res[i].name;
                    autocompleteElt.appendChild(autocompleteItem);
                    autocompleteItem.addEventListener('click', function(e){
                        callAjax(`https://api.openweathermap.org/data/2.5/weather?q=${this.textContent}&units=metric&appid=7f58d04f85c260780395fe38654c1694`)
                        autocompleteElt.classList.remove('js__active__autocomplete');
                        document.querySelector('.eror').style.transform = 'scale(0)';
                        autocompleteElt.innerHTML = '';
                        input.value = '';
                    }); 
                }
               
            }
        });

    }else {
        if(autocompleteElt.classList.contains('js__active__autocomplete')){
           autocompleteElt.classList.remove('js__active__autocomplete'); 
        }
    }
})

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){

        var lat = position.coords.latitude,
            lon = position.coords.longitude;
            callAjax(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=7f58d04f85c260780395fe38654c1694`);
    });
}

// var show = function(res){
    
// }
// callAjax('https://api.openweathermap.org/data/2.5/weather?q=douala&units=metric&appid=7f58d04f85c260780395fe38654c1694', show);
// if(navigator.geolocation) {

//          navigator.geolocation.getCurrentPosition(function(position){
            
//             // On récupère les coordonées lat et lon
//             var lat = position.coords.latitude,
//                 lon = position.coords.longitude;

//             fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=7f58d04f85c260780395fe38654c1694`)
//                 .then(res => res.json())
//                 .then( res => {
//                     city__nameEl.innerHTML = res.name;
//                     dateEl.innerHTML = currentDate;
//                     tempEl.innerHTML = `${res.main.temp}°c`;
//                     weather__descriptionEl.innerHTML = res.weather[0].description;
//                     fetch('http://127.0.0.1:5500/villes.json')
//                         .then(res => res.json())
//                         .then(res => {
//                             for (const el in res) {
//                                 if (res.hasOwnProperty(el)) {
//                                     const element = res[el];
//                                     // console.log(element.name);
//                                     document.querySelector('.allCities').innerHTML += `${element.name}\n\n`;
//                                 }
//                             }
//                         })
//                 })
    
//         });
//     }



