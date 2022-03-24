import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Listofitems = ({ val }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/card")
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(items);

  return (
    <div>
      <div className="container lg:mt-0 md:mt-16 sm:mt-24 mt-36">
        <div className="row mt-12">
          <div className="col">
            <h1
              className="
                font-bold
                lg:text-4xl
                md:text-3xl
                sm:text-2xl
                text-2xl text-blue-900
              "
            >
              Quick Search
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="lg:text-2xl md:text-xl sm:text-lg mt-3 text-gray-400">
              Discover restaurant by type of meal
            </p>
          </div>
        </div>
        <div className="row pt-3">
          {items.map((item, index) => {
            return (
              <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                <div className="shadow p-4">
                  <div className="row">
                    <div className="col-6 bg-black p-0 w-40">
                      <img
                        src={item.image}
                        alt="noImage"
                        className="w-40 h-40"
                      />
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col">
                          <NavLink
                            className="mt-3 font-bold text-2xl text-blue-900"
                            to={`/filter/${val.city_name}/${item._id}`}
                          >
                            {item.name}
                          </NavLink>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mt-2 text-lg text-gray-400">
                          {item.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Listofitems;
