import React, { useEffect } from "react";

import useMapbox from "../hooks/useMapbox";

const initialPosition = {
  lng: -122.48,
  lat: 37.8,
  zoom: 13,
};

export const MapPage = () => {
  const { setRef, coords, newMarker$ } = useMapbox(initialPosition);

  useEffect(() => {
    newMarker$.subscribe((marker) => {
      console.log(marker);
    });
  }, [newMarker$]);

  return (
    <>
      <div className="infoWindow">
        Lng: {coords.lng} | Lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
