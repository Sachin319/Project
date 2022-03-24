import React from "react";

function Overview(props) {
  return (
    <div>
      <h1 className="mt-4 font-bold text-lg text-blue-900">About this place</h1>
      <h2 className="mt-4 font-bold text-md text-blue-900">Cuisine</h2>
      <p className="mt-1 text-blue-900">
        {props.data.Cuisine[0].name}, {props.data.Cuisine[1].name}
      </p>
      <h2 className="mt-4 font-bold text-md text-blue-900">Average Cost</h2>
      <p className="mt-1 text-blue-900">
        &#8377; {props.data.cost} for two people (approx.)
      </p>
      <br></br>
      <br></br>
    </div>
  );
}

export default Overview;
