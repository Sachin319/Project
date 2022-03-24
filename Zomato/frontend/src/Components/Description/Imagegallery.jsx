import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Homepage/Header.jsx";

function Imagegallery(props) {
  const [image, setImage] = useState([]);

  const { name } = useParams();
  const abc = { name: name };
  console.log(abc);

  useEffect(() => {
    axios
      .post("http://localhost:3001/imagegallery", abc)
      .then((res) => {
        console.log(res.data);
        setImage(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, [name]);

  return (
    <div>
      <Header />
      {image.map((item, index) => {
        return (
          <div
            id="carouselExampleControls"
            className="carousel slide container-fluid w-2/4 h-96 mt-5 "
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={item.thumb} className="d-block " alt="noPic" />
              </div>
              <div className="carousel-item">
                <img src={item.thumb} className="d-block w-100" alt="noPic" />
              </div>
              <div className="carousel-item">
                <img src={item.thumb} className="d-block w-100" alt="noPic" />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Imagegallery;
