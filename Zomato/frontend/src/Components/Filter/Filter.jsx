import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Homepage/Header.jsx";
import Paggination from "./Paggination.jsx";

function Filter() {
  const { cityName, id } = useParams();
  console.log(cityName);

  const abc = { city_name: cityName, id: id };

  const [filterM, setFilterM] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [heading, setHeading] = useState(true);
  const [formData, setFormData] = useState({
    city_name: "Select Location",
    cuisine: [],
    cost: "",
    sort: "low",
  });

  const dataInsert = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  let cityName1 = [];
  let cuisineName = [];

  useEffect(() => {
    axios
      .get("http://localhost:3001/fitermenu")
      .then((res) => {
        setFilterM(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("http://localhost:3001/filter", abc)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  //removing duplicate city names
  for (let i = 0; i < filterM.length; i++) {
    cityName1[i] = filterM[i].city_name;
  }
  const uniqueCity = [...new Set(cityName1)];

  //removing duplicate Cuisine names
  let k = 0;
  for (let i = 0; i < filterM.length; i++) {
    for (let j = 0; j < filterM[i].Cuisine.length; j++) {
      cuisineName[k] = filterM[i].Cuisine[j].name;
      k++;
    }
  }
  const uniqueCuisine = [...new Set(cuisineName)];

  const submitForm = () => {
    const myFormData = {
      city_name: formData.city_name,
      sort: formData.sort,
      cuisine: formData.cuisine,
    };
    axios
      .post("http://localhost:3001/filtermenuresult", myFormData)
      .then((res) => {
        // setReFilterData(res.data);
        let fill = res.data;
        console.log(fill);
        if (
          (formData.cuisine.length !== 0 && formData.cost === "") ||
          (formData.cuisine.length !== 0 && formData.cost !== "") ||
          (formData.cuisine.length === 0 && formData.cost !== "")
        ) {
          setHeading(false);
          filterCuisine(fill);
        } else {
          setHeading(false);
          setData(fill);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let ss = [];
  let cc = [];
  const filterCuisine = (reFilterData) => {
    if (formData.cuisine.length !== 0) {
      for (let f = 0; f < formData.cuisine.length; f++) {
        for (let i = 0; i < reFilterData.length; i++) {
          for (let j = 0; j < reFilterData[i].Cuisine.length; j++) {
            if (formData.cuisine[f] === reFilterData[i].Cuisine[j].name) {
              ss[i] = reFilterData[i];
            }
          }
        }
      }
      ss = ss.filter((ele) => {
        return ele !== undefined;
      });
      console.log(ss);
    } else {
      for (let j = 0; j < reFilterData.length; j++) {
        let o = j;
        if (formData.cost === "Less than 500") {
          if (ss[j].cost < 500) {
            cc[o] = ss[j];
          }
        } else if (formData.cost === "500 to 1000") {
          if (ss[j].cost >= 500 && ss[j].cost < 1000) {
            cc[o] = ss[j];
          }
        } else if (formData.cost === "1001 to 1500") {
          if (ss[j].cost >= 1001 && ss[j].cost < 1500) {
            cc[o] = ss[j];
          }
        } else if (formData.cost === "1501 to 2000") {
          if (ss[j].cost >= 1501 && ss[j].cost < 2000) {
            cc[o] = ss[j];
          }
        } else if (formData.cost === "2000+") {
          if (ss[j].cost > 2000) {
            cc[o] = ss[j];
          }
        }
      }
      console.log(cc);
      setData(cc);
    }

    if (formData.cost !== "") {
      for (let j = 0; j < ss.length; j++) {
        let o = j;
        if (formData.cost === "Less than 500") {
          if (ss[j].cost < 500) {
            cc[o] = ss[j];
          }
        } else if (formData.cost === "500 to 1000") {
          if (ss[j].cost >= 500 && ss[j].cost < 1000) {
            cc[o] = ss[j];
          }
        } else if (formData.cost === "1001 to 1500") {
          if (ss[j].cost >= 1001 && ss[j].cost < 1500) {
            cc[o] = ss[j];
          }
        } else if (formData.cost === "1501 to 2000") {
          if (ss[j].cost >= 1501 && ss[j].cost < 2000) {
            cc[o] = ss[j];
          }
        } else if (formData.cost === "2000+") {
          if (ss[j].cost > 2000) {
            cc[o] = ss[j];
          }
        }
      }
      console.log(cc);
      setData(cc);
    } else {
      setData(ss);
    }
  };

  const meal = [
    "0",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Drinks",
    "Nightlife",
  ];

  //pagination

  let postsPerPage = 2;
  let indexOfLastPost = currentPage * postsPerPage;
  let indexOfFirstPost = indexOfLastPost - postsPerPage;
  let curData = data.slice(indexOfFirstPost, indexOfLastPost);

  //change page

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const head = () => {
    if (cityName === "Select Location") {
      return `${meal[id]} places`;
    }
    return heading
      ? ` ${meal[id]} places in ${cityName}`
      : `Restaurants in ${formData.city_name}`;
  };

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h1 className="mb-4 font-bold text-blue-900 text-2xl">{head()}</h1>
        <div className="row">
          <div className="col-lg-3 ">
            <div className="h-auto w-52 shadow-md rounded ml-3">
              <div className="ml-3">
                <h3 className="font-bold text-blue-900 pt-2">Filters</h3>
                <p className="mt-1 text-blue-900 font-medium">
                  Select Location<span className="text-red-600">*</span>
                </p>
                <>
                  <div className="dropdown mt-1">
                    <button
                      className="btn btn-light dropdown-toggle text-gray-500"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {formData.city_name}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {uniqueCity.map((item, idx) => {
                        return (
                          <li
                            key={idx}
                            className="dropdown-item"
                            onClick={(g) => {
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  city_name: (g.target.value = item),
                                };
                              });
                            }}
                          >
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <p className="text-blue-900 mt-3 font-medium">Cuisine</p>
                  {uniqueCuisine.map((item, idx) => {
                    return (
                      <div className="form-check" key={idx}>
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={item}
                            value={item}
                            onClick={(event) => {
                              var check = document.getElementById(item);
                              if (check.checked) {
                                setFormData((prevState) => {
                                  return {
                                    ...prevState,
                                    cuisine: [
                                      ...prevState.cuisine,
                                      event.target.value,
                                    ],
                                  };
                                });
                              } else {
                                setFormData((prevState) => {
                                  return {
                                    ...prevState,
                                    cuisine: prevState.cuisine.filter(
                                      (el) => el !== event.target.value
                                    ),
                                  };
                                });
                              }
                            }}
                          />
                          <label
                            className="form-check-label text-gray-500"
                            htmlFor={item}
                          >
                            {item}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-blue-900 mt-3 font-medium">Cost for Two</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="cost"
                      id="flexRadioDefault1"
                      value="Less than 500"
                      onClick={dataInsert}
                    />
                    <label
                      className="form-check-label text-gray-500"
                      htmlFor="flexRadioDefault1"
                    >
                      Less than 500
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="cost"
                      id="flexRadioDefault2"
                      value="500 to 1000"
                      onClick={dataInsert}
                    />
                    <label
                      className="form-check-label text-gray-500"
                      htmlFor="flexRadioDefault2"
                    >
                      500 to 1000
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="cost"
                      id="flexRadioDefault3"
                      value="1000 to 1500"
                      onClick={dataInsert}
                    />
                    <label
                      className="form-check-label  text-gray-500"
                      htmlFor="flexRadioDefault3"
                    >
                      1000 to 1500
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="cost"
                      id="flexRadioDefault4"
                      value="1500 to 2000"
                      onClick={dataInsert}
                    />
                    <label
                      className="form-check-label  text-gray-500"
                      htmlFor="flexRadioDefault4"
                    >
                      1500 to 2000
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input "
                      type="radio"
                      name="cost"
                      id="flexRadioDefault5"
                      value="2000+"
                      onClick={dataInsert}
                    />
                    <label
                      className="form-check-label  text-gray-500"
                      htmlFor="flexRadioDefault5"
                    >
                      2000+
                    </label>
                  </div>
                  <p className="mt-3 font-semibold text-blue-900">Sort</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sort"
                      id="flexRadioDefaultPrice1"
                      value="low"
                      onClick={dataInsert}
                      defaultChecked
                    />
                    <label
                      className="form-check-label text-gray-500"
                      htmlFor="flexRadioDefaultPrice1"
                    >
                      Price Low to High
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sort"
                      value="high"
                      onClick={dataInsert}
                      id="flexRadioDefaultPrice2"
                    />
                    <label
                      className="form-check-label text-gray-500"
                      htmlFor="flexRadioDefaultPrice2"
                    >
                      Price High to Low
                    </label>
                  </div>
                  <button
                    type="submit"
                    onClick={submitForm}
                    className="btn btn-warning mt-3 text-gray-500"
                  >
                    Apply Filter
                  </button>
                </>
                <br />
                <br />
              </div>
            </div>
          </div>
          <div className="col-lg-9 static">
            <div>
              {curData.map((item, index) => {
                return (
                  <div
                    className="card m-2 shadow-md border-0"
                    key={index}
                    style={{ width: "52rem", height: "15rem" }}
                  >
                    <div className="row">
                      <div className=" col-5 h-24 w-40 mt-4 ml-3 ">
                        <img
                          src={item.thumb}
                          className="card-img-top h-24 w-40"
                          alt="noPic"
                        />
                      </div>
                      <div className="col-7 mt-3 ">
                        <div className="card-body ">
                          <NavLink
                            className="card-title text-blue-900 font-bold text-2xl"
                            to={`/resturantdetail/${item.name}`}
                            key={item._id}
                          >
                            {item.name}
                          </NavLink>
                          <p className="card-text text-blue-900">
                            {item.address}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row ">
                      <hr
                        className="w-5/6 ml-6 text-grey-600 mt-2"
                        // style={{ marginLeft: "3rem" }}
                      />
                      <div className="col-2">
                        <p className="text-blue-800 mt-3 ml-3 text-sm">
                          CUISINE :
                        </p>
                        <p className="text-blue-800 mt-3 ml-3 text-sm">
                          Cost for Two :
                        </p>
                      </div>
                      <div className="col-10">
                        <p className="card-text text-blue-800 mt-3 ml-3 text-sm font-semibold">
                          {item.Cuisine[0].name}, {item.Cuisine[1].name}
                        </p>
                        <p className="card-text text-blue-800 mt-3 ml-3 text-sm font-semibold">
                          &#x20B9;
                          {item.cost}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="absolute right-96 mr-52 ">
              <Paggination
                postsPerPage={postsPerPage}
                totalPost={data.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
