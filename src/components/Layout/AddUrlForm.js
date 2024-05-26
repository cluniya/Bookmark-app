import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddUrlForm.css';
import BookmarkList from './BookmarkList';

const API_ENDPOINT = 'https://crudcrud.com/api/5a27aafc745f4114b77bbaa0e65802c2/bookmarks';

const AddUrlForm = () => {


    const [isformOpen,setIsformOpen] = useState(false)

  const [urlName, setUrlName] = useState('');
  const [urlAddress, setUrlAddress] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setBookmarks(response.data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const handleUrlName = (event) => {
    setUrlName(event.target.value);
  };

  const handleUrlAddress = (event) => {
    setUrlAddress(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const urlData = { urlName, urlAddress };
    if (isEditing) {
      try {
        await axios.put(`${API_ENDPOINT}/${editId}`, urlData);
        fetchBookmarks();
        resetForm();
      } catch (error) {
        console.error('Error updating the URL:', error);
      }
    } else {
      try {
        await axios.post(API_ENDPOINT, urlData);
        fetchBookmarks();
        resetForm();
      } catch (error) {
        console.error('Error adding the URL:', error);
      }
    }
  };

  const resetForm = () => {
    setUrlName('');
    setUrlAddress('');
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (bookmark) => {
    setIsEditing(true);
    setEditId(bookmark._id);
    setUrlName(bookmark.urlName);
    setUrlAddress(bookmark.urlAddress);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINT}/${id}`);
      fetchBookmarks();
    } catch (error) {
      console.error('Error deleting the URL:', error);
    }
  };

  const toggleForm=()=>{
    setIsformOpen((prevFormState) => !prevFormState)
  }

  

  return (
    <div className="container">
      <h1>Bookmark App</h1>
      <form className="form" onSubmit={handleFormSubmit} style={{ display: isformOpen ? 'block' : 'none' }}>
        <div>
          <label htmlFor="urlname">Enter URL Name:</label>
          <input
            type="text"
            id="urlname"
            value={urlName}
            onChange={handleUrlName}
            required
          />
        </div>
        <div>
          <label htmlFor="urladdress">Enter URL Address:</label>
          <input
            type="url"
            id="urladdress"
            value={urlAddress}
            onChange={handleUrlAddress}
            required
          />
        </div>
        <button type="submit">{isEditing ? 'Update URL' : 'Add URL'}</button>
      </form>
      <button onClick={toggleForm}>{isformOpen ? 'Close Form' : 'Add New URL'}</button>
      <BookmarkList bookmarks={bookmarks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default AddUrlForm;
