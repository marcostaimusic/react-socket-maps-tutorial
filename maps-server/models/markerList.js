class MarkerList {
  constructor() {
    this.activeMarkers = {};
  }

  addMarker(marker) {
    this.activeMarkers[marker.id] = marker;
    return marker;
  }

  removeMarker(id) {
    delete this.activeMarkers[id];
  }

  updateMarker(marker) {
    this.activeMarkers[marker.id] = marker;
  }
}

module.exports = MarkerList;
