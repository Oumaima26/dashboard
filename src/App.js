import React from "react";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'video-react/dist/video-react.css'; // importe les styles video-react
import Localisation from "./components/map/Localisation";
import Home from "./components/pages/Home";
import ChartJS from "./components/chart/ChartJS";
import Connexion from "./components/pages/Connexion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Connexion />} />
        <Route path="/home" element={< Home />} />
        <Route path="/map" element={< Localisation />} />        
        <Route path="/analytics" element={< ChartJS />} />
        
      </Routes>
    </Router>
  );
}
export default App;
