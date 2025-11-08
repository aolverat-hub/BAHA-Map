mapboxgl.accessToken = 'pk.eyJ1IjoiYW9sdmVyYXQiLCJhIjoiY21oOWNjYW9qMDRvMzJpb2phdjE2OGtyZCJ9.-R05P39FkM885a1f4s53Sg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/aolverat/cmh9cjrvl009i01ra1e8yawx9',
    center: [-122.27, 37.87],
    zoom: 9
});

map.on('style.load', () => {
    map.addSource('newpoints', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/aolverat-hub/BAHA-Map/main/data/New.map.geojson?nocache=' + Date.now()
    });

    map.on('click', 'newpoints-layer', (e) => {
        const coords = e.features[0].geometry.coordinates.map(Number);
        const props = e.features[0].properties;

        map.flyTo({
            center: coords,
            zoom: 14,
            speed: 0.7,
            curve: 1.2,
            essential: true
        });

        setTimeout(() => {
            const popupContent = `
        <div>
          <h3>${props.Landmark}</h3>
          <p><strong>Address:</strong> ${props.Address}</p>
          <p><strong>Architect and Date:</strong> ${props.ArchitectDate}</p>
          <p><strong>Designated:</strong> ${props.Designated}</p>
          ${props.Link ? `<p><a href="${props.Link}" target="_blank">More Information</a></p>` : ''}
          ${props.Notes ? `<p><strong>Notes:</strong> ${props.Notes}</p>` : ''}
        </div>
      `;
            new mapboxgl.Popup()
                .setLngLat(coords)
                .setHTML(popupContent)
                .addTo(map);
        }, 400);
    });

    map.on('mouseenter', 'newpoints-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'newpoints-layer', () => {
        map.getCanvas().style.cursor = '';
    });
});
