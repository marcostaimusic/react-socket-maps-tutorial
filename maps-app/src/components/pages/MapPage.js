import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyY29zdGFpbXVzaWMiLCJhIjoiY2t1Y2c4b3FzMGJzeDJxcnZ4YzBibHI3cCJ9.3V2bYl2BR-xtfYmGi6vF0g";

const intialPosition = {
  lng: 5,
  lat: 34,
  zoom: 2,
};

export const MapPage = () => {
  const mapDiv = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [intialPosition.lng, intialPosition.lat],
      zoom: intialPosition.zoom,
    });

    setMap(map);
  }, []);
  return (
    <>
      <div ref={mapDiv} className="mapContainer" />
    </>
  );
};
