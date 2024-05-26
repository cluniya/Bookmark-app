import React, { useState } from 'react';
// import { useModal } from './ModalContext';
import { useModal } from '../Bookmrk_context/ModalContext';
import axios from 'axios';
import './AddUrlModal.css';

const API_ENDPOINT = 'https://crudcrud.com/api/5a27aafc745f4114b77bbaa0e65802c2/bookmarks';

const AddUrlModal = (props) => {
  const { isOpen, closeModal } = useModal();
  const [urlName, setUrlName] = useState('');
  const [urlAddress, setUrlAddress] = useState('');

  const handleUrlNameChange = (event) => {
    setUrlName(event.target.value);
  };

  const handleUrlAddressChange = (event) => {
    setUrlAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(API_ENDPOINT, { urlName, urlAddress });
      closeModal();
      setUrlName('');
      setUrlAddress('');
    } catch (error) {
      console.error('Error adding the URL:', error);
    }
  };

//   if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={props.closeModal}>Close</button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="urlName">URL Name:</label>
            <input type="text" id="urlName" value={urlName} onChange={handleUrlNameChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="urlAddress">URL Address:</label>
            <input type="url" id="urlAddress" value={urlAddress} onChange={handleUrlAddressChange} required />
          </div>
          <button type="submit">Add URL</button>
        </form>
      </div>
    </div>
  );
};

export default AddUrlModal;
