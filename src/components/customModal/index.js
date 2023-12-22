import React from "react";
import CloseButton from "assests/images/cross.png";
import CustomInput from "components/customInput";
import CustomButton from "components/customButton";
import "./index.css";

const CustomModal = ({
  closeModal,
  element,
  saveElement,
  clearElementValue,
  saveElementValue,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    saveElement(element);
    clearElementValue();
  };

  const handleClick = () => {
    closeModal();
    clearElementValue();
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    let temp = element;
    if (name === "x" || name === "y") {
      if (temp[name] !== value) {
        temp[name] = parseInt(value);
      }
    }
    saveElementValue(temp);
  };

  const splitValue = (value) => {
    let splitArr = value.split("%");

    return parseFloat(splitArr[0]).toFixed();
  };

  return (
    <div className="customModal">
      <div className="customModal__header">
        <p>Edit Label</p>
        <img src={CloseButton} alt="close-modal" onClick={handleClick} />
      </div>
      <hr />
      <form onSubmit={(e) => handleSubmit(e)}>
        <CustomInput
          label="Text"
          value={`This is a ${element.type}`}
          disabled
        />
        <CustomInput
          label="X (in %)"
          value={splitValue(element.x)}
          type="number"
          onChange={handleChange}
          name="x"
        />
        <CustomInput
          label="Y (in %)"
          value={splitValue(element.y)}
          type="number"
          onChange={handleChange}
          name="y"
        />
        <CustomInput label="Font Size" disabled />
        <CustomInput label="Font Weight" disabled />
        <CustomButton title="Save Changes" type="submit" />
      </form>
    </div>
  );
};

export default CustomModal;
