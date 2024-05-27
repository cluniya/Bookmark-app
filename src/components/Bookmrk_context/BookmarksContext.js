// BookmarksContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://crudcrud.com/api/8c5dd42e19404bff9b3b0094971a99b2/bookmarks';

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [urlName, setUrlName] = useState('');
  const [urlAddress, setUrlAddress] = useState('');

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
    setIsModalOpen(false);
  };

  const handleEdit = (bookmark) => {
    setIsEditing(true);
    setEditId(bookmark._id);
    setUrlName(bookmark.urlName);
    setUrlAddress(bookmark.urlAddress);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINT}/${id}`);
      fetchBookmarks();
    } catch (error) {
      console.error('Error deleting the URL:', error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isModalOpen,
        isEditing,
        urlName,
        urlAddress,
        setUrlName,
        setUrlAddress,
        handleFormSubmit,
        handleEdit,
        handleDelete,
        toggleModal,
        resetForm,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};
