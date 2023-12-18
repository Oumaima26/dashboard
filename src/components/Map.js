import React, { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup,WMSTileLayer  } from "react-leaflet";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";
function Map() {
  /*useEffect(() => {
    // Check if the map container is already initialized
    if (
      !document.getElementById("map").classList.contains("leaflet-container")
    ) {
      var map = L.map("map").setView(
        [36.853029754164794, 10.251378764492873],
        14
      );
      var layerControl = L.control.layers();
      layerControl.setPosition("topleft");
      L.marker([36.84990, 10.24932]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
      var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "OpenStreetMap",
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
      layerControl.addTo(map);
    }
  }, []);*/ // The empty dependency array ensures this effect runs once after the initial render

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="mdi mdi-home" />
                </span>{" "}
                Dashboard
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    <span />
                    Overview{" "}
                    <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                  </li>
                </ul>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-12 stretch-card grid-margin">
                <div className="card  card-img-holder text-white">
                  <div className="card-body">
                    <MapContainer
                      center={[36.853029754164794, 10.251378764492873]}
                      zoom={14}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
                      <Marker position={[36.8499, 10.24932]}>
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* content-wrapper ends */}
          {/* partial:partials/_footer.html */}
          <Footer />
          {/* partial */}
        </div>
      </div>
    </div>
  );
}

export default Map;
