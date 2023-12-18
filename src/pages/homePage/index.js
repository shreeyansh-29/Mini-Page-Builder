import React, { useState, useEffect } from "react";
import "./index.css";
import SidebarBox from "components/sidebarBox/index";
import { sidebarElements } from "./constants";
import CustomModal from "components/customModal";

const HomePage = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  let newElement= {}
;
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const x = e.clientX;
    const y = e.clientY;
    newElement = { type, x, y };

    console.log(newElement);
    setElements([...elements, newElement]);

    openModal(newElement);
  };

  const openModal = (element) => {
    setShowModal(!showModal);
  };

  const handleSelectElement = (element) => {
    setSelectedElement(element);
  };

  const handleUpdateElement = (updatedElement) => {
    // Implement your update logic here
    // You can use React state to update the elements array
    console.log("Update Element:", updatedElement);
  };

  const handleDeleteElement = () => {
    // Implement your delete logic here
    // You can use React state to update the elements array
    setElements(elements.filter((el) => el !== selectedElement));
    setSelectedElement(null);
  };

  useEffect(() => {
    // Save changes to local storage whenever elements are updated
    localStorage.setItem("elements", JSON.stringify(elements));
  }, [elements]);

  return (
    <div
      className="homepage"
      style={{ background: `${showModal ? "rgba(0, 0, 0, 0.5)" : ""}` }}
    >
      <div
        className="homepage__wrapper"
        style={{ pointerEvents: `${showModal ? "none" : ""}` }}
      >
        <div
          className="page"
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => e.preventDefault()}
        >
          {elements.map((element, index) => (
            <div
              key={index}
              className={`element ${
                selectedElement === element ? "selected" : ""
              }`}
              style={{ left: element.x, top: element.y }}
              onClick={() => handleSelectElement(element)}
              onDoubleClick={() => openModal(element)}
            >
              {element.type}
            </div>
          ))}
        </div>
        <div
          className="homepage__sidebar"
          style={{ background: `${showModal ? "rgba(0, 0, 0, 0.5)" : ""}` }}
        >
          <p>Blocks</p>
          <div className="sidebar__elementContainer">
            {sidebarElements.map((item) => (
              <SidebarBox
                key={item}
                label={item}
                onDragStart={(e) => handleDragStart(e, item)}
              />
            ))}
          </div>
        </div>
      </div>
      {showModal && <CustomModal element={newElement} closeModal={openModal} />}
    </div>
  );
};

export default HomePage;
