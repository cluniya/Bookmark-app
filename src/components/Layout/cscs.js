import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddurlForm.css'; // Assuming you have a CSS file for styling

const AddUrlForm = () => {
  const [urlName, setUrlName] = useState('');
  const [urlAddress, setUrlAddress] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_ENDPOINT = 'https://crudcrud.com/api/5a27aafc745f4114b77bbaa0e65802c2/bookmarks';

  useEffect(() => {
    // Fetch bookmarks when the component mounts
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
    const urlData = {
      urlName,
      urlAddress,
    };
    if (isEditing) {
      try {
        await axios.put(`${API_ENDPOINT}/${editId}`, urlData);
        // Refresh the bookmarks list
        fetchBookmarks();
        // Clear the form fields
        setUrlName('');
        setUrlAddress('');
        setIsEditing(false);
        setEditId(null);
      } catch (error) {
        console.error('There was an error updating the URL:', error);
      }
    } else {
      try {
        await axios.post(API_ENDPOINT, urlData);
        // Refresh the bookmarks list
        fetchBookmarks();
        // Clear the form fields
        setUrlName('');
        setUrlAddress('');
      } catch (error) {
        console.error('There was an error adding the URL:', error);
      }
    }
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
      // Refresh the bookmarks list
      fetchBookmarks();
    } catch (error) {
      console.error('There was an error deleting the URL:', error);
    }
  };

  return (
    <div className="container">
      <h1>Bookmark App</h1>
      <form className="form" onSubmit={handleFormSubmit}>
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
      <div className="bookmarks-list">
        {bookmarks.map((bookmark) => (
          <div key={bookmark._id} className="bookmark-item">
            <div className="bookmark-info">
              <span className="bookmark-name">{bookmark.urlName}</span>
              <a href={bookmark.urlAddress} target="_blank" rel="noopener noreferrer">
                {bookmark.urlAddress}
              </a>
            </div>
            <div className="bookmark-actions">
              <button onClick={() => handleEdit(bookmark)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(bookmark._id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddUrlForm;
