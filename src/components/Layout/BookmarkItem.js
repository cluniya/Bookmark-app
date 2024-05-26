import React from 'react';
import './BookmarkItem.css';

const BookmarkItem = ({ bookmark, onEdit, onDelete }) => {
  return (
    <div className="bookmark-item">
      <div className="bookmark-info">
        <span className="bookmark-name">{bookmark.urlName}</span>
        <a href={bookmark.urlAddress} target="_blank" rel="noopener noreferrer">
          {bookmark.urlAddress}
        </a>
      </div>
      <div className="bookmark-actions">
        <button onClick={() => onEdit(bookmark)} className="edit-button">Edit</button>
        <button onClick={() => onDelete(bookmark._id)} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default BookmarkItem;
