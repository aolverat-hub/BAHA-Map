mapboxgl.accessToken = 'pk.eyJ1IjoiYW9sdmVyYXQiLCJhIjoiY21oOWNjYW9qMDRvMzJpb2phdjE2OGtyZCJ9.-R05P39FkM885a1f4s53Sg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/aolverat/cmh9cjrvl009i01ra1e8yawx9',
    center: [-122.27, 37.87],
    zoom: 9
});

map.on('load', () => {
    // Add GeoJSON source
    map.addSource('newpoints', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/aolverat-hub/BAHA-Map/main/data/New.map.geojson?nocache=' + Date.now()
    });

    // Add circle layer for points
    map.addLayer({
        id: 'newpoints-layer',
        type: 'circle',
        source: 'newpoints',
        paint: {
            'circle-color': '#4264FB',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    }, 'waterway-label'); // keeps your points visible above the base map

    // Click popup
    map.on('click', 'newpoints-layer', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        const popupContent = `
            <div>
                <h3>${properties.Landmark}</h3>
                <p><strong>Address:</strong> ${properties.Address}</p>
                <p><strong>Architect and Date:</strong> ${properties.ArchitectDate}</p>
                <p><strong>Designated:</strong> ${properties.Designated}</p>
                ${properties.Link ? `<p><a href="${properties.Link}" target="_blank">More Information</a></p>` : ''}
                ${properties.Notes ? `<p><strong>Notes:</strong> ${properties.Notes}</p>` : ''}
            </div>
        `;

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

    // Cursor interactions
    map.on('mouseenter', 'newpoints-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'newpoints-layer', () => {
        map.getCanvas().style.cursor = '';
    });
});
