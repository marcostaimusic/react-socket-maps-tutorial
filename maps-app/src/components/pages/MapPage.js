import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyY29zdGFpbXVzaWMiLCJhIjoiY2t1Y2c4b3FzMGJzeDJxcnZ4YzBibHI3cCJ9.3V2bYl2BR-xtfYmGi6vF0g";

const initialPosition = {
  lng: 5,
  lat: 34,
  zoom: 2,
};

export const MapPage = () => {
  const mapDiv = useRef();
  const [map, setMap] = useState();
  const [coords, setCoords] = useState(initialPosition);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initialPosition.lng, initialPosition.lat],
      zoom: initialPosition.zoom,
    });

    setMap(map);
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
