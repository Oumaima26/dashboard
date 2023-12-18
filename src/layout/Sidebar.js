import React from "react";

function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="/" className="nav-link">
            <div className="nav-profile-image">
            <img src="assets/images/faces/user.png" alt="image"></img>
              <span className="login-status online" />
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">Kadri Oumaima</span>
              <span className="text-secondary text-small">Admin</span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/home">
            <span className="menu-title">Dashboard</span>
            <i className="mdi mdi-home menu-icon" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            <span className="menu-title">Optical Monitoring</span>
            <i className="mdi mdi-monitor menu-icon" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            <span className="menu-title">Thermal Monitoring</span>
            <i className="mdi mdi-monitor menu-icon" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/map">
            <span className="menu-title">Map Monitoring</span>
            <i className="mdi mdi-map-marker-radius menu-icon" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="/analytics">
            <span className="menu-title">Data Analytics</span>
            <i className="mdi mdi-chart-bar menu-icon" />
          </a>
        </li>
        
        <li className="nav-item">
          <a className="nav-link" href="/">
            <span className="menu-title">Settings</span>
            <i className="mdi mdi-settings menu-icon" />
          </a>
        </li>
        
        <li className="nav-item">
          <a className="nav-link" href="/">
            <span className="menu-title">About</span>
            <i className="mdi mdi-alert-box menu-icon" />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
