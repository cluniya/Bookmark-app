import React from 'react';
import BookmarkItem from './BookmarkItem';
import './BookmarkList.css';

const BookmarkList = ({ bookmarks, onEdit, onDelete }) => {
  return (
    <div className="bookmarks-list">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark._id}
          bookmark={bookmark}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BookmarkList;
