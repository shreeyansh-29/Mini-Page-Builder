import React from "react";
import "./index.css";

const CustomButton = ({ title, onClick }) => {
  return (
    <div className="custombutton" onClick={onClick}>
      <p>{title}</p>
    </div>
  );
};

export default CustomButton;
