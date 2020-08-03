const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const weather = document.getElementById('weather');
const celsiusInput = document.getElementById('celcius');
const fahrenheitInput = document.getElementById('fahrenheit');

document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = document.getElementById('location-input').value;

    if(!location) {
       return alert('please provide a location.')
    }
    var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.geocoding
        .forwardGeocode({
            query: location,
            autocomplete: false,
            limit: 1
        })
        .send()
        .then(function (response) {
            if (response && response.body && response.body.features && response.body.features.length) {
                var feature = response.body.features[0];
                setMap(feature.center);
            } else {
                alert('Invalid Request!');
            }
        });
});
//Event Handling 
celsiusInput.addEventListener('input', () => {
    const temp = celsiusInput.value
    const fahrenheit = tryConvert(temp, toFahrenheit);
    fahrenheitInput.value = fahrenheit;
});

fahrenheitInput.addEventListener('input', () => {
    const temp = fahrenheitInput.value
    const celsius = tryConvert(temp, toCelsius);
    celsiusInput.value = celsius;
});

// Functions
function startMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVpdGFkZXYiLCJhIjoiY2tjZWd3b2VqMDhiZjJ5bm5jeTh6eGNhdCJ9.fZbPXubKwQaC8lOGvO_jzw';
    setMap([3.4, 6.45]);
}

function setMap(center) {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: center,
        zoom: 8
    });
    new mapboxgl.Marker({ color: '#fff' }).setLngLat(center).addTo(map);

    weatherForecast(center[1],center[0]);
}

function weatherForecast(lat, lon) {
    const appid = '8a673c08c3fa2d3cda1388596985f388';

    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+appid)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            humidity.textContent = data.main.humidity;
            windSpeed.textContent = data.wind.speed;
            weather.textContent = data.weather[0].main +', '+ data.weather[0].description;

            celsiusInput.value = data.main.temp;
            fahrenheitInput.value = toFahrenheit(celsiusInput.value);

            humidity.style.color = 'red';
            windSpeed.style.color = 'red';
            weather.style.color = 'red';
        });
}
 
function toFahrenheit(celsius) {
return (celsius * 9 / 5) + 32;
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input).toFixed(1);
    return output;
}
window.addEventListener('load', startMap);
