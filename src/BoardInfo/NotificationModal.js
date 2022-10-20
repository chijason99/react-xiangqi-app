import React from "react";

export default function NotificationModal(props) {
  const { handleCloseNotificationModal, gameOver, error, currentTurn } = props;
  return (
    <div className="notification-modal-container">
      <div className="notification-modal">
        <div className="notification-modal-btn-container">
          <button className="notification-modal-btn" onClick={handleCloseNotificationModal}>
            &times;
          </button>
        </div>
        {error && (
          <span>
            Error: the FEN that you input was invalid. Please try again.
          </span>
        )}
        {gameOver && (
          <span>
            {currentTurn==="red"?"Black":"Red"} wins!
          </span>
        )}
      </div>
    </div>
  );
}
