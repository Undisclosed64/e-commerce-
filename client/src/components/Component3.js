import React from "react";
import "../App.css";
import Carousel from "./Carousel";

const Component3 = ({ data }) => {
  return (
    <div className="container-three">
      <div className="componentThree-container">
        <Carousel slides={data} />
      </div>
    </div>
  );
};

export { Component3 };
