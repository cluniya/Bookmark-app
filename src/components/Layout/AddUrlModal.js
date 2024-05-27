import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './AddUrlModal.css';
import { BookmarksContext } from '../Bookmrk_context/BookmarksContext';

const AddUrlModal = ({ isOpen, onClose, children }) => {
  const { resetForm } = useContext(BookmarksContext);

  const handleFunClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleFunClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={handleFunClose}>Close</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default AddUrlModal;
