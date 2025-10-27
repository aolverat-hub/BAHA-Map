mapboxgl.accessToken = 'pk.eyJ1IjoiYW9sdmVyYXQiLCJhIjoiY21oOWNjYW9qMDRvMzJpb2phdjE2OGtyZCJ9.-R05P39FkM885a1f4s53Sg';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/aolverat/cmh9cjrvl009i01ra1e8yawx9', // your Style URL goes here
  center: [-122.27, 37.87], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom
    });