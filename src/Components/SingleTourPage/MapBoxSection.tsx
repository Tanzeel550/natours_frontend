import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapBoxSection = props => {
  useEffect(() => {
    const { locations, startDates } = props;
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/tanzeel550/ckiafgfnt08n219qq3rbbz5la',
      scrollZoom: false,
    });

    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach(location => {
      //    Create a Marker
      const el = document.createElement('div');
      el.className = 'marker';

      //    Add marker
      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat(location.coordinates)
        .addTo(map);

      // Add Popup
      new mapboxgl.Popup({
        offset: 30,
      })
        .setLngLat(location.coordinates)
        .setHTML(
          `<p>Day ${new Date(startDates[0])}: ${location.description}</p>`
        )
        .addTo(map);

      // Extends map bounds to include current location
      bounds.extend(location.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });
  }, []);

  return (
    <section className="section-map">
      <div id="map" />
    </section>
  );
};

export default MapBoxSection;
