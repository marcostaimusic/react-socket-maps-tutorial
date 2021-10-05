import React, { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

import useMapbox from "../hooks/useMapbox";

const initialPosition = {
  lng: -122.48,
  lat: 37.8,
  zoom: 13,
};

export const MapPage = () => {
  const {
    setRef,
    coords,
    newMarker$,
    markerMovement$,
    createMarker,
    moveMarker,
  } = useMapbox(initialPosition);

  const { socket } = useContext(SocketContext);

  //listen to socket emitting active markers
  useEffect(() => {
    socket.on("activeMarkers", (markers) => {
      for (const key of Object.keys(markers)) {
        createMarker(markers[key], key);
      }
    });
  }, [socket, createMarker]);

  useEffect(() => {
    newMarker$.subscribe((marker) => {
      socket.emit("newMarker", marker);
    });
  }, [newMarker$, socket]);

  useEffect(() => {
    markerMovement$.subscribe((marker) => {
      socket.emit("movingMarker", marker);
    });
  }, [markerMovement$, socket]);

  useEffect(() => {
    socket.on("movingMarker", (marker) => {
      moveMarker(marker);
    });
  }, [socket, moveMarker]);

  //listen to new markers
  useEffect(() => {
    socket.on("newMarker", (marker) => {
      createMarker(marker, marker.id);
    });
  }, [socket, createMarker]);

  return (
    <>
      <div className="infoWindow">
        Lng: {coords.lng} | Lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
