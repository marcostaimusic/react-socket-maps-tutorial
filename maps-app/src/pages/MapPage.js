import React from "react";

import useMapbox from "../hooks/useMapbox";

const initialPosition = {
  lng: -122.48,
  lat: 37.8,
  zoom: 13,
};

export const MapPage = () => {
  const { setRef, coords } = useMapbox(initialPosition);

  return (
    <>
      <div className="infoWindow">
        Lng: {coords.lng} | Lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
