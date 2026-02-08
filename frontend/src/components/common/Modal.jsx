import React, { useEffect } from "react";
import "../../css/common/Modal.css";

const Modal = ({ children, onClose }) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative" }}
      >
        <button
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ❌
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
