import React from "react";
import "./index.css";

const CustomInput = ({
  label,
  value = "",
  disabled = false,
  type = "text",
  onChange,
  name,
}) => {
  return (
    <div className="custominput">
      <label htmlFor="text">{label}</label>
      <input
        defaultValue={value}
        disabled={disabled}
        type={type}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default CustomInput;
