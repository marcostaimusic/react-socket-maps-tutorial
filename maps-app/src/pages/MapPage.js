import React, { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

import useMapbox from "../hooks/useMapbox";

const initialPosition = {
  lng: -122.48,
  lat: 37.8,
  zoom: 13,
};

export const MapPage = () => {
  const { setRef, coords, newMarker$, markerMovement$ } =
    useMapbox(initialPosition);

  const { socket } = useContext(SocketContext);

  //listen to socket emitting active markers

  useEffect(() => {
    socket.on("activeMarkers", (markers) => {
      console.log(markers);
    });
  }, [socket]);

  useEffect(() => {
    newMarker$.subscribe((marker) => {
      socket.emit("newMarker", marker);
    });
  }, [newMarker$, socket]);

  useEffect(() => {
    markerMovement$.subscribe((marker) => {
      // console.log(marker);
    });
  }, [markerMovement$]);

  //listen to new markers

  useEffect(() => {
    socket.on("newMarker", (marker) => {
      console.log(marker);
    });
  }, [socket]);

  return (
    <>
      <div className="infoWindow">
        Lng: {coords.lng} | Lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
