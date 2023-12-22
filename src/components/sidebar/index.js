import React from "react";
import CustomButton from "components/customButton";
import {sidebarElements} from "components/homeLayout/constants";
import SidebarBox from "components/sidebarBox";
import "./index.css";

const SideBar = ({
  showModal,
  handleExport,
  imported,
  handleDragStart,
  handleImport,
}) => {
  return (
    <div
      className="homepage__sidebar"
      style={{background: `${showModal ? "rgba(0, 0, 0, 0.5)" : ""}`}}
    >
      <div className="sidebar__header">
        <p>Blocks</p>
        <CustomButton title={"Export"} onClick={handleExport} />
      </div>
      <div className="sidebar__elementContainer">
        {sidebarElements.map((item) => (
          <SidebarBox
            key={item}
            label={item}
            onDragStart={(e) => handleDragStart(e, item)}
          />
        ))}
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

export default SideBar;
