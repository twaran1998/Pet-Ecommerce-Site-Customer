import React, { useState } from "react";
import './goToTop.css';
const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <button
      className={`go-to-top-button ${isVisible ? "visible" : ""}`}
      onClick={handleClick}
    >
      Go to top
    </button>
  );
};

export default GoToTopButton;