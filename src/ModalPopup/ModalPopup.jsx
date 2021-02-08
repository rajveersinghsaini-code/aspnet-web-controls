import React from "react";
import "../ModalPopup/ModalPopup.css";
const ModalPopup = () => {
  return (
    <div
      role="dialog"
      id="dialog1"
      aria-labelledby="dialog1_label"
      aria-modal="true"
      className="hidden"
    >
      <h2 id="dialog1_label" className="dialog_label">
        Add Delivery Address
      </h2>
    </div>
  );
};
export default ModalPopup;
