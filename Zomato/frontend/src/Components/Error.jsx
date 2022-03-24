import React from "react";
import Header from "./Homepage/Header.jsx";
import ErrorImage from "../images/404.jpg";
import { NavLink } from "react-router-dom";

function Error() {
  return (
    <div className="container-fluid static">
      <Header></Header>
      <div
        className="bg-cover bg-center w-full "
        style={{ backgroundImage: `url(${ErrorImage})`, height: "28rem" }}
      ></div>
      <NavLink to="/" className="btn font-bold absolute right-0 left-0">
        Go to Home
      </NavLink>
    </div>
  );
}

export default Error;
