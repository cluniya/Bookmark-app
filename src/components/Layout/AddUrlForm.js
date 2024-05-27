import React, { useContext } from 'react';
import { BookmarksContext } from '../Bookmrk_context/BookmarksContext';
import AddUrlModal from './AddUrlModal';
import './AddUrlForm.css';

const AddUrlForm = () => {
    const {
        isModalOpen,
        toggleModal,
        urlName,
        urlAddress,
        setUrlName,
        setUrlAddress,
        handleFormSubmit,
        isEditing,
    } = useContext(BookmarksContext);

    const handleUrlNameChange = (event) => {
        setUrlName(event.target.value);
    };

    const handleUrlAddressChange = (event) => {
        setUrlAddress(event.target.value);
    };

    return (
        <>
            <button onClick={toggleModal}>Add New URL</button>
            <AddUrlModal isOpen={isModalOpen} onClose={toggleModal}>
                <form className="form" onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="urlname">Enter URL Name:</label>
                        <input
                            type="text"
                            id="urlname"
                            value={urlName}
                            onChange={handleUrlNameChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="urladdress">Enter URL Address:</label>
                        <input
                            type="url"
                            id="urladdress"
                            value={urlAddress}
                            onChange={handleUrlAddressChange}
                            required
                        />
                    </div>
                    <button type="submit">{isEditing ? 'Update URL' : 'Add URL'}</button>
                </form>
            </AddUrlModal>
        </>
    );
};

export default AddUrlForm;
