import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyY29zdGFpbXVzaWMiLCJhIjoiY2t1Y2c4b3FzMGJzeDJxcnZ4YzBibHI3cCJ9.3V2bYl2BR-xtfYmGi6vF0g";

const initialPosition = {
  lng: -122.46,
  lat: 37.8,
  zoom: 13.5,
};

export const MapPage = () => {
  const mapDiv = useRef();
  const map = useRef();
  const [coords, setCoords] = useState(initialPosition);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initialPosition.lng, initialPosition.lat],
      zoom: initialPosition.zoom,
    });
    map.current = map;
  }, []);

  useEffect(() => {
    map.current?.on("move", () => {
      const { lng, lat } = map.current.getCenter();
      setCoords({
        lng: lng.toFixed(2),
        lat: lat.toFixed(2),
        zoom: map.current.getZoom().toFixed(2),
      });
    });
  }, []);

  return (
    <>
      <div className="infoWindow">
        Lng: {coords.lng} | Lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={mapDiv} className="mapContainer" />
    </>
  );
};
