const MarkerList = require("./markerList");

class Sockets {
  constructor(io) {
    this.io = io;

    this.markerList = new MarkerList();

    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      socket.emit("activeMarkers", this.markerList.activeMarkers);

      socket.on("newMarker", (marker) => {
        // console.log("new marker", marker);
        this.markerList.addMarker(marker);
        socket.broadcast.emit("newMarker", marker);
      });
    });
  }
}

module.exports = Sockets;
