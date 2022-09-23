import React from "react";
import "../App.css";
import { useState } from "react";
import { AiOutlineRightCircle, AiOutlineLeftCircle } from "react-icons/ai";

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
    backgroundImage: `url(${slides[current].url})`,
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
    <div style={containerStyles} className="carousal-wrapper">
      <AiOutlineLeftCircle style={leftArrowStyles} onClick={handlePrevious} />
      <AiOutlineRightCircle style={rightArrowStyles} onClick={handleNext} />
      <div style={carouselStyles} className="carousel">
        <span className="text">{slides[current].text}</span>
      </div>
    </div>
  );
};

export default Carousel;
