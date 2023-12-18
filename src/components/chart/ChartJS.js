import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import Footer from "../../layout/Footer";

function ChartJS() {
  const chartRef = useRef(null);

  useEffect(() => {
    const initializeChart = () => {
      const canvas = document.getElementById("barChart");

      if (canvas) {
        if (chartRef.current) {
          chartRef.current.destroy(); // Destroy the existing chart
        }

        var ctx = canvas.getContext("2d");
        var data = [100, 50, 80, 120];
        var myChartbar = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Detection zone",
              "Classification zone",
              "Neutralization zone",
              "Nail free zone",
            ],
            datasets: [
              {
                label: "Chart Example",
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        chartRef.current = myChartbar; // Save the reference to the new chart
      }
    };

    initializeChart();
  }, []); // Empty dependency array to run the effect only once

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
                  <i className="mdi mdi-chart-bar" />
                </span>{" "}
                Map
              </h3>
              
            </div>
            <div class="row">
              <div class="col-lg-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <canvas id="barChart" style={{ height: "230px" }}></canvas>
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

export default ChartJS;
