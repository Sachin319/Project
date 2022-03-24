import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Header from "../Homepage/Header.jsx";
import Overview from "./Overview.jsx";
import Contact from "./Contact";

function Resturantdetail() {
  const [resData, setResData] = useState([]);
  const [bool, setBool] = useState(true);

  const { name } = useParams();
  const abc = { name1: name };

  useEffect(() => {
    axios
      .post("http://localhost:3001/restaurantdetail", abc)
      .then((res) => {
        setResData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

  return (
    <div>
      <Header />
      {resData.map((item, index) => {
        return (
          <div className="container" key={index}>
            <div
              className="w-100 h-72 bg-cover bg-no-repeat bg-center mt-10 relative"
              style={{
                backgroundImage: `url(${item.thumb})`,
              }}
            >
              <div className="absolute bottom-3 right-3 opacity-90">
                <NavLink
                  className="btn btn-light text-blue-800 font-semibold "
                  to={`/imagegallery/${item.name}`}
                >
                  click to see image gallery
                </NavLink>
              </div>
            </div>
            <h1 className="mt-3 font-bold text-xl text-blue-800">
              {item.name}
            </h1>
            <br />
            {/* tab */}
            <ul className="nav relative">
              <li className="nav-item">
                <button
                  className={
                    bool
                      ? "nav-link active underline underline-offset-8 decoration-red-700 font-bold text-blue-900"
                      : "nav-link font-bold text-blue-900"
                  }
                  aria-current="page"
                  onClick={() => setBool(true)}
                >
                  Overview
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={
                    bool
                      ? "nav-link font-bold text-blue-900"
                      : "nav-link active underline underline-offset-8 decoration-red-700 font-bold text-blue-900"
                  }
                  onClick={() => setBool(false)}
                >
                  Contact
                </button>
              </li>
              <NavLink
                className="btn absolute right-2 bg-red-600 -mt-3 text-light border-light"
                to={`/order/${item.name}/${item._id}`}
              >
                Place Online Order
              </NavLink>
            </ul>

            <hr style={{ width: "100%", marginLeft: "0", textAlign: "left" }} />
            {bool ? <Overview data={item} /> : <Contact data={item} />}
          </div>
        );
      })}
    </div>
  );
}

export default Resturantdetail;
