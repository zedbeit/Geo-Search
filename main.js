const mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVpdGFkZXYiLCJhIjoiY2tjZWd3b2VqMDhiZjJ5bm5jeTh6eGNhdCJ9.fZbPXubKwQaC8lOGvO_jzw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
});
