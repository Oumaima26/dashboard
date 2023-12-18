import React, { useEffect } from "react";
import L from "leaflet";
const Map = () => {
  useEffect(() => {
    var iconattractionUrl = "../../assets/maps/MarksIcons/photo.png";
    var staticPathTiles="../../assets/maps/tiles/";
    var map = L.map("map").setView(
      [36.853029754164794, 10.251378764492873],
      14
    );

    var iconattraction = L.icon({
      iconUrl: iconattractionUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
    var marker = L.marker([36.8499, 10.24932], { icon: iconattraction });
    marker
      .bindPopup("" + marker.getLatLng())
      .openPopup()
      .addTo(map);

      var osm = L.tileLayer(staticPathTiles + "{z}/{x}/{y}.png", {
        maxZoom: 17,
        minZoom: 14,
    }).addTo(map);
  }, []);

  return <div id="map" style={{ height: "400px" }} />;
};

export default Map;
