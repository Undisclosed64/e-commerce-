import React from "react";
import "../App.css";
import { useState } from "react";

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const handlePrevious = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };
  const scroll = () => {
    if (current === slides.length - 1) {
      return setCurrent(0);
    }
    return setCurrent(current + 1);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      scroll();
    }, 5000);
    return () => clearInterval(interval);
  });

  const containerStyles = {
    height: "100%",
    position: "relative",
  };
  const carouselStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundImage: `url(${slides[current].url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    color: "#eee",
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "50px",
    color: "#eee",
    zIndex: 1,
    cursor: "pointer",
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "50px",
    color: "#eee",
    zIndex: 1,
    cursor: "pointer",
  };
  return (
    <div style={containerStyles}>
      <div style={leftArrowStyles} onClick={handlePrevious}>
        Prev
      </div>
      <div style={rightArrowStyles} onClick={handleNext}>
        Next
      </div>

      <h1 style={carouselStyles}>Hi</h1>
    </div>
  );
};

export default Carousel;
