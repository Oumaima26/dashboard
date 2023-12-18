import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container d-md-flex ">
        <span className="text-muted d-block text-center text-sm-start d-sm-inline-block">
          &copy; Copyright{" "}
          <strong>
            <span>Hannibal</span>
          </strong>
          . All Rights Reserved
        </span>
      </div>
    </footer>
  );
}

export default Footer;
