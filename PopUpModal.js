import React from 'react';
import './PopUpModal.css'; // Import the CSS file

function PopUpModal({ content }) {
  return (
    <div className="popup-modal">
      <div className="popup-content">
        {content}
        <button className="close-button">&times;</button> {/* Close Button */}
      </div>
    </div>
  );
}

export default PopUpModal;
