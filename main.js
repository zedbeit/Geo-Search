var windSpeed = document.getElementById('windSpeed');
var humidity = document.getElementById('humidity');
var weather = document.getElementById('weather');

document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('success!');

    var location = document.getElementById('location-input').value;

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
            // console.log(response.body.features[]);
            if (response && response.body && response.body.features && response.body.features.length) {
                var feature = response.body.features[0];
                setMap(feature.center);

                weatherForecast(feature.center[1], feature.center[0]);
            } else {
                alert('Invalid Request!');
            }
        });
});
// Functions
function startMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVpdGFkZXYiLCJhIjoiY2tjZWd3b2VqMDhiZjJ5bm5jeTh6eGNhdCJ9.fZbPXubKwQaC8lOGvO_jzw';
    setMap([-74.5, 40]);
}
function setMap(center) {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: center,
        zoom: 12
    });
    new mapboxgl.Marker({ color: '#fff' }).setLngLat(center).addTo(map);
}
function weatherForecast(lat, lon) {
    var appid = '8a673c08c3fa2d3cda1388596985f388';

    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+appid)
        .then(response => response.json())
        .then(data => {
            humidity.textContent = data.main.humidity;
            windSpeed.textContent = data.wind.speed;
            weather.textContent = data.weather[0].main +', '+ data.weather[0].description;
            humidity.style.color = 'red';
            windSpeed.style.color = 'red';
            weather.style.color = 'red';
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}
window.addEventListener('load', startMap);