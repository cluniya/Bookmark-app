import React, { useContext } from 'react';
import './BookmarkItem.css';
import { BookmarksContext } from '../Bookmrk_context/BookmarksContext';

const BookmarkItem = ({ bookmark }) => {
  const { handleEdit, handleDelete } = useContext(BookmarksContext);

  return (
    <div className="bookmark-item">
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
  );
};

export default BookmarkItem;
