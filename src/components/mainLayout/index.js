import React from "react";
import "./index.css";

const MainLayout = ({
  handleDrop,
  elements,
  showModal,
  selectedElement,
  handleElementDrag,
  handleSetDragging,
  handleDrag,
  handleSelectElement,
  handleKeyDown,
  id=""
}) => {
  return (
    <div
      id={id}
      className="mainlayout"
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => e.preventDefault()}
    >
      {elements &&
        elements.map(
          (element, index) =>
            !showModal && (
              <element.type
                tabIndex={1}
                key={index}
                className={`element ${
                  selectedElement === element ? "selected" : ""
                }`}
                style={{left: element.x, top: element.y}}
                onDragStart={(e) => handleElementDrag(e, element)}
                onDragEnd={handleSetDragging}
                onDrag={handleDrag}
                draggable
                onClick={() => handleSelectElement(element)}
                onKeyDown={(e) => handleKeyDown(e, element)}
              >
                {showModal
                  ? null
                  : element.type === "Button"
                  ? `${element.type}`
                  : `This is a ${element.type}`}
              </element.type>
            )
        )}
    </div>
  );
};

export default MainLayout;
