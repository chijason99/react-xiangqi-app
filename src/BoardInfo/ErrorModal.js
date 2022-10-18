import React from "react";

export default function ErrorModal({ handleCloseErrorModal }) {
  return (
    <div className="error-modal-container">
      <div className="error-modal">
        <div className="error-modal-btn-container">
          <button className="error-modal-btn" onClick={handleCloseErrorModal}>
            &times;
          </button>
        </div>
        <span>
          Error: the FEN that you input was invalid. Please try again.
        </span>
      </div>
    </div>
  );
}
