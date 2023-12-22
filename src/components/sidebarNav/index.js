import React from "react";
import "./index.css";
import {FaTimes} from "react-icons/fa";
import CustomButton from "components/customButton";

const SideBarNav = ({
  isOpen,
  handleToggle,
  handleImport,
  handleExport,
  imported,
}) => {
  return (
    <div
      className="sidebar__container"
      style={
        isOpen ? {opacity: "100%", top: "0"} : {opacity: "0%", top: "-100%"}
      }
    >
      <div className="sidebar__closeButton" onClick={handleToggle}>
        <FaTimes />
      </div>
      <div className="sidebar__wrapper">
        <ul className="sidebar__menu">
          <li>Label</li>
          <li>Input</li>
          <li>Button</li>
        </ul>
        <CustomButton type="button" title={"Export"} onClick={handleExport} />
        {!imported && (
          <div>
            <label htmlFor="fileInput">Import Configuration</label>
            <input
              id="fileInput"
              type="file"
              accept=".json"
              onChange={handleImport}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarNav;
