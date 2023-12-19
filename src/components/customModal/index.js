import React from "react";
import "./index.css";
import CloseButton from "assests/images/cross.png";
import CustomInput from "components/customInput";
import CustomButton from "components/customButton";

const CustomModal = ({ closeModal, element }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal()
  };

  return (
    <div className="customModal">
      <div className="customModal__header">
        <p>Edit Label</p>
        <img src={CloseButton} alt="close-modal" onClick={closeModal} />
      </div>
      <hr />
      <form onSubmit={(e) => handleSubmit(e)}>
        <CustomInput label="Text" value={`This is a ${element.type}`} />
        <CustomInput label="X" value={element.x} />
        <CustomInput label="Y" value={element.y}  />
        <CustomInput label="Font Size" />
        <CustomInput label="Font Weight" />
        <CustomButton title="Save Changes" type='submit' />
      </form>
    </div>
  );
};

export default CustomModal;
