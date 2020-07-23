document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('success!');

    var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.geocoding
        .forwardGeocode({
            query: document.getElementById('location-input').value,
            autocomplete: false,
            limit: 1
        })
        .send()
        .then(function(response) {
            if (response && response.body && response.body.features && response.body.features.length ) {
                var feature = response.body.features[0];

                setMap(feature.center);
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
            zoom: 13
        });
        new mapboxgl.Marker({color:'#fff'}).setLngLat(center).addTo(map);
    }

    window.addEventListener('load', startMap);