import React, { useState, useEffect } from "react";
import bimage from "../../images/shutterstock_348320018.png";
import axios from "axios";
import "../../css/Bimage.css";
import { NavLink } from "react-router-dom";

const Bgimage = ({ city }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [city1, setCity1] = useState("");
  const [heading1, setHeading1] = useState(true);

  const cityName = [];

  useEffect(() => {
    axios.get("http://localhost:3001/").then((res) => {
      setData(res.data);
    });
  }, []);

  //removing duplicate city names
  for (let i = 0; i < data.length; i++) {
    cityName[i] = data[i].city_name;
  }
  const uniqueCity = [...new Set(cityName)];

  const cityName1 = (name) => {
    setHeading1(false);
    setCity1(name);
    city(name);
  };

  return (
    <div className="container-fluid">
      <div className="col lg:h-96 md:h-80 sm:h-72 h-60 -mt-10">
        <div
          className="
          mt-10
              h-96
              w-full
              bg-cover bg-no-repeat bg-center bg-gradient-to-b
              from-black-300
              to-black-600
            "
          style={{
            backgroundImage: `url(${bimage})`,
          }}
        >
          <div className="h-96 w-full"></div>
        </div>
        <div className="row">
          <div className="col justify-content-center d-flex">
            <div
              className="
                  bg-white
                  lg:-mt-72
                  md:-mt-64
                  sm:-mt-72
                  -mt-64
                  rounded-full
                  lg:h-32 lg:w-32
                  md:h-28 md:w-28
                  sm:h-24 sm:w-24
                  h-20
                  w-20
                "
            >
              <p
                className="
                    lg:text-7xl
                    md:text-6xl
                    sm:text-6xl
                    text-5xl
                    font-bold
                    text-red-700
                    lg:ml-8
                    md:ml-8
                    sm:ml-7
                    ml-5
                    mt-2
                    lg:pt-2
                    md:pt-2
                    sm:pt-1
                  "
              >
                e!
              </p>
            </div>
            <div></div>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <h1
              className="
                  lg:text-4xl
                  md:text-3xl
                  sm:text-2xl
                  font-bold
                  text-white
                  lg:-mt-36
                  md:-mt-32
                  sm:-mt-44
                  -mt-40
                "
            >
              Find the best Restaurant, Cafe, and Bar
            </h1>
          </div>
        </div>

        <div className="row">
          <div
            className="
                col-lg-5 col-md-5 col-sm-12
                d-flex
                justify-content-lg-end
                justify-content-md-end
                justify-content-sm-center
                justify-content-center
              "
          >
            <div className="dropdown lg:-mt-20 md:-mt-16 sm:-mt-32 -mt-32">
              <button
                className="
                    btn btn-light
                    dropdown-toggle
                    lg:px-16
                    md:px-14
                    sm:px-12
                    px-3
                    bg-white
                    border-none
                  "
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {heading1 ? `Please Select a location` : city1}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {uniqueCity.map((item, idx) => {
                  return (
                    <button
                      className="dropdown-item"
                      key={idx}
                      onClick={() => {
                        cityName1(item);
                      }}
                    >
                      {item}
                    </button>
                  );
                })}
              </ul>
            </div>
          </div>

          <div
            className="
                col-lg- col-md-5 col-sm-12 col-10
                d-flex
                justify-content-lg-start
                justify-content-md-start
                justify-content-sm-center
                justify-content-center
                lg:-mt-20
                md:-mt-16
                sm:-mt-16
                -mt-16
                lg:ml-0
                md:ml-0
                sm:ml-0
                ml-6
              "
          >
            <div className="d-flex bg-white h-10 lg:w-96 md:w-96 sm:w-96 w-full rounded-md">
              <i className="bi bi-search mt-2 pl-2 text-gray-500"></i>
              <input
                type="text"
                placeholder="search for restaurants"
                className=" ml-4 border-0 w-full rounded-md"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {searchTerm.length !== 0 && (
            <div className="suggestion_box lg:-mt-9  md:-mt-2 -mt-4">
              {data
                // eslint-disable-next-line array-callback-return
                .filter((item) => {
                  if (
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item, idx) => {
                  return (
                    <NavLink to={`/resturantdetail/${item.name}`} key={idx}>
                      <button className="suggestion w-full">{item.name}</button>
                    </NavLink>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Bgimage;
