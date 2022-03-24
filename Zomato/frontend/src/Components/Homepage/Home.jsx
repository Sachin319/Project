import React, { useState } from "react";
import Header from "./Header.jsx";
import Bgimage from "./Bgimage.jsx";
import Listofitems from "./Listofitems";

function Home() {
  const [city, setCity] = useState({
    city_name: "Select Location",
  });

  const value = (val) => {
    setCity(() => {
      return { city_name: val };
    });
  };
  console.log(city);

  return (
    <div>
      <Header></Header>
      <Bgimage city={value}></Bgimage>
      <Listofitems val={city}></Listofitems>
    </div>
  );
}

export default Home;
