import React from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";
import Map from "./Map"; // Adjust the path based on your project structure

const Localisation = () => {
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              {/* ... your page header code ... */}
            </div>
            <div className="row">
              <Map />
            </div>
          </div>
          {/* ... rest of your component ... */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Localisation;
