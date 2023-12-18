import React, { useEffect } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import Footer from "../../layout/Footer";
import L from "leaflet";
import "./ring.js";
import "./Semicircle.js";
//À chaque clic sur la carte, un nouveau marqueur est ajouté.
//Lorsque le nombre total de marqueurs atteint ou dépasse deux,
//une ligne est automatiquement créée pour connecter ces marqueurs
function CreerMarqeur(map) {
  var markers = [];
  map.on("click", function (e) {
    var marker = L.marker(e.latlng)
      .addTo(map)
      .bindPopup("Latitude: " + e.latlng.lat + "<br>Longitude: " + e.latlng.lng)
      .openPopup();
    markers.push(marker);
    if (markers.length >= 2) {
      var latlngs = [];
      for (var i = 0; i < markers.length; i++) {
        latlngs.push(markers[i].getLatLng());
      }
      L.polyline(latlngs, { color: "blue" }).addTo(map);
    }
  });
}
var drones = [];
var list = [];
function addRandomMarker(icon, map, position) {
  var randomLatLng = getRandomLatLng();
  list.push(randomLatLng);
  var randomMarker = L.marker(randomLatLng, { icon: icon })
    .addTo(map)
    .bindPopup(
      "Latitude: " + randomLatLng[0] + "<br>Longitude: " + randomLatLng[1]
    )
    .openPopup();
  var distance = map.distance(position, randomLatLng);
  drones.push(randomMarker);
  if (list.length >= 2) {
    var latlngs = [];
    for (var i = 0; i < list.length; i++) {
      latlngs.push(list[i]);
    }
    var polyline = L.polyline(latlngs, { color: "red" }).addTo(map);
    for (var i = 1; i < list.length; i++) {
      var lastMarker = drones[i - 1];
      map.removeLayer(lastMarker);
    }
  }

  if (distance <= 1000) {
    var zone = "";
    if (distance > 750 && distance <= 1000) {
      zone = 1;
    } else if (distance > 500 && distance <= 750) {
      zone = 2;
    } else if (distance > 250 && distance <= 500) {
      zone = 3;
    } else if (distance <= 250) {
      zone = 4;
    }
  }
}
//fonction qui génère aléatoirement des valeurs de latitude et de longitude
function getRandomLatLng() {
  var minLat = 36.8438;
  var maxLat = 36.8543;
  var minLng = 10.2403;
  var maxLng = 10.2548;
  var lat = Math.random() * (maxLat - minLat) + minLat;
  var lng = Math.random() * (maxLng - minLng) + minLng;
  return [lat, lng];
}
//animation d'arc
var arc;
var animationInterval;
var angle = 0; // Angle initial animation d'arc
function startAnimation() {
  animationInterval = setInterval(function () {
    angle += 1; // Augmentez la valeur pour ajuster la vitesse de rotation
    if (angle > 360) angle = 0; // Réinitialisez l'angle à 0 après une rotation complète
    arc.setDirection(angle, 15);
  }, 50);
}
function stopAnimation() {
  angle = 0;
  clearInterval(animationInterval);
}
//fonction pour créer drone en utilisant les données de GDR, d'angle et de position du centre
function createDrone(gdr, angle, centre, map, icon) {
  var R = 6371000;
  var x = gdr * Math.sin((angle * Math.PI) / 180);
  var y = gdr * Math.cos((angle * Math.PI) / 180);
  var latitudeD = centre[0] + (y / R) * (180 / Math.PI);
  var longitudeD =
    centre[1] +
    ((x / R) * (180 / Math.PI)) / Math.cos((centre[0] * Math.PI) / 180);
  var markerD = L.marker([latitudeD, longitudeD]);
  markerD.setIcon(icon);
  markerD
    .bindPopup("" + markerD.getLatLng())
    .openPopup()
    .addTo(map);
  var testslr = map.distance(centre, markerD.getLatLng());
}
//fonction de creation de cercle
function createCircle(position, color, fillColor, fillOpacity, radius, weight) {
  var circle = L.circle(position, {
    color: color,
    fillColor: fillColor,
    fillOpacity: fillOpacity,
    radius: radius,
    weight: weight,
  });
  return circle;
}
const Localisation = () => {
  useEffect(() => {
    // Check if the map container is already initialized
    if (
      !document.getElementById("map").classList.contains("leaflet-container")
    ) {
      var iconattractionUrl = "../../assets/maps/MarksIcons/photo.png";
      var iconHeliportUrl = "../../assets/maps/MarksIcons/drone.png";
      var staticPathTiles = "../../assets/maps/tiles/";
      var position = [36.8499, 10.24932];

      var anglearc = 15;
      var map = L.map("map").setView(
        [36.853029754164794, 10.251378764492873],
        14
      );
      var layerControl = L.control.layers();
      layerControl.setPosition("topleft");

      var circles = L.layerGroup();
      //Modification d'icon
      var iconheliport = L.icon({
        iconUrl: iconHeliportUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });
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
      //cree drone a partir de gdr et angle
      var gdr = 800;
      var anglepositiondrone = 45;
      createDrone(gdr, anglepositiondrone, position, map, iconheliport);
      var zoneList = [1000, 750, 500, 250];
      var detection = zoneList[0];
      var classification = zoneList[1];
      var neutralization = zoneList[2];
      var nailfree = zoneList[3];

      var circleDetection = L.donut(position, {
        radius: detection,
        innerRadius: classification,
        innerRadiusAsPercent: false,
        fillColor: "#f03",
        fillOpacity: 0.4,
        weight: 0,
      });

      var circleClassification = L.donut(position, {
        radius: classification,
        innerRadius: neutralization,
        innerRadiusAsPercent: false,
        fillColor: "#3f3",
        fillOpacity: 0.4,
        weight: 0,
      });
      // Create another donut
      var circleNeutralization = L.donut(position, {
        radius: neutralization,
        innerRadius: nailfree,
        innerRadiusAsPercent: false,
        fillColor: "#30f",
        fillOpacity: 0.4,
        weight: 0,
      });
      var circleNailfree = createCircle(
        position,
        "white",
        "#F5FFFA",
        0.4,
        nailfree,
        0
      );

      arc = L.semiCircle(position, {
        radius: detection,
        fill: "white",
        color: "#F5FFFA",
        fillOpacity: 0.4,
        weight: 2,
      }).setDirection(0, anglearc);
      circles.clearLayers();
      circles.addLayer(circleDetection);
      circles.addLayer(circleClassification);
      circles.addLayer(circleNeutralization);
      circles.addLayer(circleNailfree);

      circles.addLayer(arc);
      circles.addLayer(marker);

      // Ajoutez un événement au contrôle de couche pour démarrer l'animation lorsque la couche est activée

      map.on("overlayadd", function (event) {
        if (event.name === "Circles") {
          startAnimation();
        }
      });
      // Ajoutez un événement au contrôle de couche pour arrêter l'animation lorsque la couche est désactivée
      map.on("overlayremove", function (event) {
        if (event.name === "Circles") {
          stopAnimation();
        }
      });
      CreerMarqeur(map);
      //creer drone
      var minutes = 5;
      var interval = 2000; // 2 secondes
      var elapsedTime = 0;
      var intervalId = setInterval(function () {
        // addRandomMarker(iconheliport,map,position);
        elapsedTime += interval;
        if (elapsedTime >= minutes * 60 * 1000) {
          clearInterval(intervalId); // Arrêtez l'intervalle après 1 minute
        }
      }, interval);
      var osm = L.tileLayer(staticPathTiles + "{z}/{x}/{y}.png", {
        maxZoom: 17,
        minZoom: 14,
      }).addTo(map);
      var tunisiageoserver = L.tileLayer.wms(
        "http://127.0.0.1:8090/geoserver/crm/wms",
        {
          layers: "crm:tun_trs_roads_osm",
          format: "image/png",
          transparent: true,
        }
      );
      layerControl.addBaseLayer(osm, "OpenStreetMap");
      layerControl.addBaseLayer(tunisiageoserver, "TunisiaGeoserver");
      layerControl.addOverlay(circles, "Circles");
      layerControl.addTo(map);
    }
  }, []);
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon btn-gradient-danger text-white me-2">
                  <i className="mdi mdi-map-marker-radius" />
                </span>{" "}
                Map
              </h3>
            </div>
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div id="map" style={{ height: "400px"}} />
                  </div>
                </div>
              </div>
              <div className="col-md-6 stretch-card grid-margin">
                <div className="card card-img-holder text-white">
                  <div>
                    <video width="640" height="360" controls>
                      <source src="/assets/video/v3.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Localisation;
