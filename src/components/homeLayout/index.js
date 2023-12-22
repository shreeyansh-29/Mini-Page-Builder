import React, {useState, useEffect} from "react";
import CustomModal from "components/customModal";
import "./index.css";
import SideBar from "components/sidebar";
import MainLayout from "components/mainLayout";

let initialState = {
  type: "",
  x: "",
  y: "",
  id: "",
};

const HomeLayout = ({handleToggle, isOpen}) => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newElementValue, setNewElementValue] = useState(initialState);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [imported, setImported] = useState(false);
  const [draggedElementPosition, setDraggedElementPosition] = useState({
    x: 0,
    y: 0,
  });

  /*
    useEffect runs everytime new element get placed 
  */

  useEffect(() => {
    localStorage.setItem("elements", JSON.stringify(elements));
  }, [elements]);

  /** 
    * @returns
    * handleDrop() called when element is dropped or dragged afterwards to save element details
  */

  const handleDrop = (e) => {
    e.preventDefault();

    if (isDragging) {
      const container = document.getElementById("container");
      const containerRect = container.getBoundingClientRect();

      const xPercentage =
        ((draggedElementPosition.x - containerRect.left) /
          containerRect.width) *
        100;
      const yPercentage =
        ((draggedElementPosition.y - containerRect.top) /
          containerRect.height) *
        100;

      const updatedElement = {
        ...draggedElement,
        x: `${xPercentage}%`,
        y: `${yPercentage}%`,
      };

      saveElementValue(updatedElement);
      saveElement(updatedElement);
      setIsDragging(false);
    } else {
      const container = document.getElementById("container");
      const containerRect = container.getBoundingClientRect();

      const xPercentage =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const yPercentage =
        ((e.clientY - containerRect.top) / containerRect.height) * 100;

      setShowModal(true);
      const type = e.dataTransfer.getData("type");
      const x = `${xPercentage}%`;
      const y = `${yPercentage}%`;
      const id = JSON.stringify(new Date());
      saveElementValue({type, x, y, id});
    }
  };


  const handleDrag = (e) => {
    if (isDragging) {
      setDraggedElementPosition({x: e.clientX, y: e.clientY});
    }
  };

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  };

  /**
   * @returns
   * clearElementValue() called to clear the state
   */

  const clearElementValue = () => setNewElementValue(initialState);
  const saveElementValue = (element) => setNewElementValue(element);

  const saveElement = (element) => {
    let temp = [...elements];
    let updated = temp.findIndex((el) => el.id === element.id);
    if (updated > -1) temp.splice(updated, 1);
    setElements([...temp, element]);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelectElement = (element) => {
    setSelectedElement(element);
  };

  const handleDeleteElement = () => {
    setElements(elements.filter((el) => el !== selectedElement));
    setSelectedElement(null);
  };

   /**
   * @returns
   * handleExport() called when export the configuration
  */

  const handleExport = () => {
    if (elements.length !== 0) {
      const exportData = {
        elements: elements,
      };

      const jsonData = JSON.stringify(exportData, null, 2);

      const blob = new Blob([jsonData], {type: "application/json"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pageConfiguration.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

   /**
   * @returns
   * handleImport() called when json file is imported
  */

  const handleImport = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          setElements(importedData.elements);
          setImported(true);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(file);
    }
  };

  /**
   * @returns
   * handleKeyDown() called when element is selected and keypress action is done
  */

  const handleKeyDown = (e, element) => {
    if (e.code === "Enter") {
      setShowModal(true);
      setNewElementValue({
        type: element.type,
        x: element.x,
        y: element.y,
        id: element.id,
      });
    }
    if (e.code === "Delete") handleDeleteElement(element);
  };

  /**
   * @returns
   * handleElementDrag() called when element is started dragging
   */

  const handleElementDrag = (e, element) => {
    handleDragStart(e, element.type);
    setIsDragging(true);
    setDraggedElement(element);
  };

  /**
   *
   * @returns
   * handleSetDragging() sets dragging state to be false
   */
  const handleSetDragging = () => setIsDragging(false);

  return (
    <div
      className="homepage"
      style={{background: `${showModal ? "rgba(0, 0, 0, 0.5)" : ""}`}}
    >
      <div
        className="homepage__wrapper"
        style={{pointerEvents: `${showModal ? "none" : ""}`}}
      >
        <MainLayout
          id={"container"}
          elements={elements}
          showModal={showModal}
          handleDrop={handleDrop}
          selectedElement={selectedElement}
          handleElementDrag={handleElementDrag}
          handleSetDragging={handleSetDragging}
          handleDrag={handleDrag}
          handleSelectElement={handleSelectElement}
          handleKeyDown={handleKeyDown}
        />
        <SideBar
          imported={imported}
          showModal={showModal}
          handleExport={handleExport}
          handleDragStart={handleDragStart}
          handleImport={handleImport}
        />
      </div>
      {showModal && (
        <CustomModal
          element={newElementValue}
          closeModal={closeModal}
          saveElement={saveElement}
          clearElementValue={clearElementValue}
          saveElementValue={saveElementValue}
        />
      )}
    </div>
  );
};

export default HomeLayout;
