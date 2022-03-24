import React, { useState } from "react";
import Header from "../Homepage/Header.jsx";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Login({ setUser }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", loginData)
      .then((res) => {
        alert(res.data.status);
        console.log(res.data.data);
        if (res.data.status === "Login Successful") {
          setUser(true);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <Header />

      <div className="container d-flex justify-center  mt-5">
        <form>
          <h1 className="text-blue-800 mb-4 font-bold">Zomato Login</h1>
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn bg-warning text-black "
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
