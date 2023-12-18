import React from "react";
import GridIcon from "assests/images/gridIcon.png";
import "./index.css";

const SidebarBox = ({ label, onDragStart }) => {
  return (
    <div className="sidebarbox" draggable onDragStart={onDragStart}>
      <img src={GridIcon} alt="grid-icon" />
      <p className="sidebarbox__text">{label}</p>
    </div>
  );
};

export default SidebarBox;
