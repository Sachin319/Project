import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Homepage/Header.jsx";
import { useParams } from "react-router-dom";

function Order() {
  const { name, _id } = useParams();

  const abc = { _id: _id };

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/order", abc)
      .then((res) => {
        setMenu(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  const pay = (name1, price, resturantName) => {
    const data = { item: name1, cost: price, resturant: resturantName };
    axios
      .post("http://localhost:3001/paynow", data)
      .then((res) => {
        var information = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: res.data,
        };
        post(information);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="mb-4 font-bold text-blue-900 text-2xl">
          Menu of {name}
        </h1>
        <div className="row">
          {menu.map((menuItem, idx) => {
            return (
              <div className="col-lg-4 col-md-6 col-sm-12" key={idx}>
                <div className="shadow p-4">
                  <div className="row">
                    <div className="col-6 bg-black p-0 w-40">
                      <img
                        src={menuItem.image}
                        alt="noImage"
                        className="w-40 h-60"
                      />
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col">
                          <h1 className="mt-3 font-bold text-2xl text-blue-900">
                            {menuItem.name}
                          </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <p className="mt-3 text-gray-400">
                            {menuItem.description}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <p className="mt-3 text-gray-400">
                            &#x20B9; {menuItem.price}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => pay(menuItem._id, menuItem.price, name)}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Order;
