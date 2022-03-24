import React from "react";
import { Link } from "react-router-dom";
import "../../css/header.css";

function Header() {
  return (
    <div className="container-fluid">
      <div className="bg-danger ">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="bg-light rounded-full h-12 w-12 ms-5">
              <Link className=" logo " to="/">
                e!
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end me-5"
              id="navbarNav"
            >
              <ul className="navbar-nav ">
                <li className="nav-item d-flex justify-content-end">
                  <Link
                    className="nav-link active text-white"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item d-flex justify-content-end">
                  <Link
                    className="nav-link border border-white text-white rounded-md"
                    to="/singup"
                  >
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
