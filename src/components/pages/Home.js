import React from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import Footer from "../../layout/Footer";
// import { Player } from "video-react";
// Assurez-vous d'importer les styles video-react dans votre fichier de style principal
import "video-react/dist/video-react.css";
function Home() {
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
              <div className="col-md-6 stretch-card grid-margin">
                <div className="card card-img-holder text-white">
                  <div className="card">
                    <div className="card-body">
                      <video width="100%" height="250" controls>
                        <source src="/assets/video/v3.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 stretch-card grid-margin">
                <div className="card card-img-holder text-white">
                  <div className="card">
                    <div className="card-body">
                     
                    <canvas id="barChart" style={{height: 250}} />

                    </div>
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
}

export default Home;
{
  /*
   <div class="col-lg-12 grid-margin bg-gradient-info stretch-card">
    <div class="card">
      <div class="card-body">
        
      </div>
    </div>
  </div>
  <div className="col-md-6 stretch-card grid-margin">
    <div className="card card-img-holder text-white">
      <div>
      <Player
playsInline
poster="/assets/poster.png"
src="/assets/video/v3.mp4"
/>
      </div>
    </div>
  </div>*/
}
