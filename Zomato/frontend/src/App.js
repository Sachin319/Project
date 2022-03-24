import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Homepage/Home.jsx";
import Resturantdetail from "./Components/Description/Resturantdetail.jsx";
import Imagegallery from "./Components/Description/Imagegallery.jsx";
import Filter from "./Components/Filter/Filter.jsx";
import Order from "./Components/Description/Order.jsx";
import Login from "./Components/Register/Login.jsx";
import Singup from "./Components/Register/Singnup.jsx";
import Error from "./Components/Error.jsx";

function App() {
  const [user, setUser] = useState(false);
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route
            path="/resturantdetail/:name"
            element={<Resturantdetail></Resturantdetail>}
          />
          <Route
            path="/imagegallery/:name"
            element={<Imagegallery></Imagegallery>}
          />
          <Route path="/filter/:cityName/:id" element={<Filter></Filter>} />
          <Route path="/order/:name/:_id" element={<Order></Order>} />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <Login setUser={setUser}></Login>
            }
          />
          <Route path="/singup" element={<Singup></Singup>} />
          <Route path="*" element={<Error></Error>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
