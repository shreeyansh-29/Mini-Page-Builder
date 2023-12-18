import React from "react";
import "./index.css";

const CustomInput = ({ label, value = "" }) => {
  return (
    <div className="custominput">
      <label htmlFor="text">{label}</label>
      <input value={value} />
    </div>
  );
};

export default CustomInput;
