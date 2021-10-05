import React, { useRef, useState, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { v4 } from "uuid";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyY29zdGFpbXVzaWMiLCJhIjoiY2t1Y2c4b3FzMGJzeDJxcnZ4YzBibHI3cCJ9.3V2bYl2BR-xtfYmGi6vF0g";

function useMapbox(initialPosition) {
  const mapDiv = useRef();
  const setRef = useCallback((node) => {
    mapDiv.current = node;
  }, []);
  const mapRef = useRef();
  const [coords, setCoords] = useState(initialPosition);
  const markers = useRef({});

  const createMarker = useCallback((event) => {
    console.log(event);
    const { lng, lat } = event.lngLat;
    const marker = new mapboxgl.Marker();
    marker.id = v4();
    marker.setLngLat([lng, lat]).addTo(mapRef.current).setDraggable(true);

    markers.current[marker.id] = marker;
  });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initialPosition.lng, initialPosition.lat],
      zoom: initialPosition.zoom,
    });
    mapRef.current = map;
  }, [initialPosition]);

  useEffect(() => {
    mapRef.current?.on("move", () => {
      const { lng, lat } = mapRef.current.getCenter();
      setCoords({
        lng: lng.toFixed(2),
        lat: lat.toFixed(2),
        zoom: mapRef.current.getZoom().toFixed(2),
      });
    });
  }, []);

  useEffect(() => {
    mapRef.current?.on("click", createMarker);
  }, [createMarker]);

  return {
    createMarker,
    coords,
    markers,
    setRef,
  };
}

export default useMapbox;
