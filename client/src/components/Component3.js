import React from "react";
import "../App.css";
import Carousel from "./Carousel";

const Component3 = ({ data }) => {
  return (
    <div>
      <Carousel slides={data} />
    </div>
  );
};

export { Component3 };
