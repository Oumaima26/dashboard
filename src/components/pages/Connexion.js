import React from "react";
import hannibal from "../../assets/img/hannibal.png";
function Connexion() {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper  d-flex align-items-center auth">
          <div className="row flex-grow ">
            <div className="col-lg-4 mx-auto ">
              <div className="auth-form-light text-left p-5 bg-gradient-dark ">
                <div className="brand-logo">
                  <img src={hannibal} alt="logo"/>
                </div>
                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Matriculation"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <a
                      className="btn btn-block btn-gradient-danger btn-lg font-weight-medium auth-form-btn"
                      href="/"
                    >
                      SIGN IN
                    </a>
                  </div>

                  <div className="text-center mt-4 font-weight-light">
                    <a
                      href="/"
                      className="auth-link text-white justify-content-center"
                    >
                      Forgot password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
