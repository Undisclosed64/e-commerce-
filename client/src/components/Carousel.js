import React from "react";
import "../App.css";
import { useState, useRef } from "react";

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const interval = useRef(null);
  const [count, setCount] = useState(0);

  const reset = () => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      scroll();
    }, 5000);
  };

  const handlePrevious = () => {
    reset();
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const handleNext = () => {
    reset();
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };
  const scroll = () => {
    setCount((count) => count + 1);
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  React.useEffect(() => {
    interval.current = setInterval(() => {
      scroll();
    }, 5000);
    return () => clearInterval(interval.current);
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

      <h1 style={carouselStyles}>{count}</h1>
    </div>
  );
};

export default Carousel;
