//À chaque clic sur la carte, un nouveau marqueur est ajouté.
//Lorsque le nombre total de marqueurs atteint ou dépasse deux,
//une ligne est automatiquement créée pour connecter ces marqueurs
function CreerMarqeur() {
  var markers=[];
  map.on('click', function (e) {
    var marker = L.marker(e.latlng).addTo(map)
      .bindPopup("Latitude: " + e.latlng.lat + "<br>Longitude: " + e.latlng.lng).openPopup();
    markers.push(marker);
    if (markers.length >= 2) {
      var latlngs = [];
      for (var i = 0; i < markers.length; i++) {
        latlngs.push(markers[i].getLatLng());
      }
      var polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map);
    }
  });
}
//creer drone aleatoire
var drones=[];
var list=[]
function addRandomMarker(e) {
    var randomLatLng = getRandomLatLng();
    list.push(randomLatLng);
    var randomMarker = L.marker(randomLatLng, { icon: iconheliport }).addTo(map)
      .bindPopup("Latitude: " + randomLatLng[0] + "<br>Longitude: " + randomLatLng[1]).openPopup();
    var distance=map.distance(position,randomLatLng);
      drones.push(randomMarker);
    if (list.length >= 2) {
      var latlngs = [];
      for (var i = 0; i < list.length; i++) {
        latlngs.push(list[i]);
      }
      var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map)
    for (var i = 1; i < list.length; i++) {
      var lastMarker = drones[i-1];
      map.removeLayer(lastMarker);
      }
    }


    if(distance <= 1000){
       var zone="";
       if (distance > 750 && distance <= 1000) {
       zone=1;
//       alert('DETECTION ZONE');
    } else if (distance > 500 && distance <= 750) {
        zone=2;
//        alert('CLASSIFICATION ZONE');
    } else if (distance > 250 && distance <= 500) {
        zone=3;
//        alert('NEUTRALISATION ZONE');
    } else if (distance <= 250) {
        zone=4;
    }
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/detection/adddrone/",
        data: JSON.stringify({
            "position":randomLatLng,
            "zone":zone,
            "gdr":distance,
        }),
        success: function(response) {
          console.log("Données envoyées avec succès au serveur Python");
        },
        error: function(error) {
          console.error("Erreur lors de l'envoi des données au serveur Python:", error);
        }
    });
    }

}

//fonction de creation de cercle
function createCircle(position, color, fillColor, fillOpacity, radius, weight) {
    var circle = L.circle(position, {
        color: color,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
        radius: radius,
        weight: weight
    });
    return circle;
}

//animation d'arc
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
//fonction qui génère aléatoirement des valeurs de latitude et de longitude
function getRandomLatLng() {
//<!--    var minLat = 36.836690195326021;-->
//<!--    var maxLat = 36.869369313003574;-->
//<!--    var minLng = 10.193747277285587;-->
//<!--    var maxLng = 10.309010251700162;-->
    var epsilon = 0.01  ;
    var minLat = 36.8438;
    var maxLat = 36.8543;
    var minLng = 10.2403;
    var maxLng = 10.2548;
    var lat = Math.random() * (maxLat - minLat) + minLat;
    var lng = Math.random() * (maxLng - minLng) + minLng;
    return [lat, lng];
}

function addRandomDrone(){
    var minutes = 5;
    var interval = 2000; // 2 secondes
    var elapsedTime = 0;
    var intervalId = setInterval(function () {
        addRandomMarker();
        elapsedTime += interval;
        if (elapsedTime >= minutes * 60 * 1000) {
            clearInterval(intervalId); // Arrêtez l'intervalle après 1 minute
        }
    }, interval);
}

//fonction pour créer drone en utilisant les données de GDR, d'angle et de position du centre
function createDrone(gdr,angle,centre){
    var R=6371000;
    var x = gdr * Math.sin(angle * Math.PI / 180);
    var y = gdr * Math.cos(angle * Math.PI / 180);
    var latitudeD = centre[0] + (y / R) * (180 / Math.PI);
    var longitudeD = centre[1] + (x / R) * (180 / Math.PI) / Math.cos(centre[0] * Math.PI / 180);
    var markerD = L.marker([latitudeD,longitudeD]);
    markerD.setIcon(iconheliport);
    markerD.bindPopup("" + markerD.getLatLng()).openPopup().addTo(map);
    var testslr = map.distance(centre, markerD.getLatLng());
}