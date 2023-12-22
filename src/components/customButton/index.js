import React from "react";
import "./index.css";

const CustomButton = ({title, onClick, type = "button"}) => {
  return (
    <button type={type} className="custombutton" onClick={onClick}>
      <p>{title}</p>
    </button>
  );
};

export default CustomButton;
