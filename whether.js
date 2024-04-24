let SearchButton = document.getElementById('SearchButton');
let CityNameInput = document.getElementById('text');
let WeatherIcon = document.getElementsByClassName('weather-icon')[0];
let NewCityName = document.getElementsByClassName('city')[0];
let Temp = document.getElementsByClassName('temp')[0];
let Humidity = document.getElementsByClassName('humidity')[0];
let WindSpeed = document.getElementsByClassName('wind')[0];

const apiKey ='0e5228e5fa2b2995a8d1c889ba389040';
const apiUrl =  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

SearchButton.addEventListener('click', function() {
    let city = CityNameInput.value;
    if (city.trim() === '') {
        alert('Please enter a city name.');
        return;
    }

    fetch(apiUrl + city + `&appid=${apiKey}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        NewCityName.innerHTML = data.name;
        Temp.innerHTML = Math.round(data.main.temp) + '°C';
        Humidity.innerHTML = data.main.humidity + '%';
        WindSpeed.innerHTML = data.wind.speed + ' Km/h';

        // Assuming you have weather icon data in your response
        if (data.weather && data.weather.length > 0) {
            let iconUrl = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
            WeatherIcon.src = iconUrl;
            WeatherIcon.alt = data.weather[0].description;
        }
    })
    .catch(error => {
        console.log('There was a problem with your fetch operation: ', error);
    });
});
