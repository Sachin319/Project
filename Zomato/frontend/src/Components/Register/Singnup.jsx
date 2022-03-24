import React, { useState } from "react";
import Header from "../Homepage/Header.jsx";
import axios from "axios";

function Singnup() {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", signUpData)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="w-100 h-screen ">
      <Header />
      <div className=" mt-5 container d-flex justify-content-center align-item-center">
        <form>
          <h1 className="text-blue-800 mb-4 font-bold">Zomato Signup</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Enter Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              required
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Enter a Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 ">
            <label className="form-label" htmlFor="exampleTel1">
              Enter your mobile number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleTel1"
              name="phone"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 ">
            <label
              className="form-label"
              htmlFor="exampleAddress1"
              maxLength="10"
              minLength="10"
              required
            >
              Enter your address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleAddress1"
              name="address"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary bg-warning border-0 text-black"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Singnup;
