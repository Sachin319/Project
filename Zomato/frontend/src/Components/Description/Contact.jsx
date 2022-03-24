import React from "react";

function Contact(props) {
  return (
    <div>
      <h2 className="mt-4  text-lg text-blue-900">Phone Number</h2>
      <p className="mt-1 text-red-600">+91-9888888888</p>
      <h2 className="mt-4 font-bold text-md text-blue-900">
        {props.data.name}
      </h2>
      <p className="mt-1 text-blue-900">{props.data.address}</p>
      <br />
      <br />
    </div>
  );
}

export default Contact;
