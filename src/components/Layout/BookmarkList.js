import React, { useContext } from 'react';
import { BookmarksContext } from '../Bookmrk_context/BookmarksContext';
import BookmarkItem from './BookmarkItem';

const BookmarkList = () => {
  const { bookmarks } = useContext(BookmarksContext);

  return (
    <ul>
      {bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark._id} bookmark={bookmark} />
      ))}
    </ul>
  );
};

export default BookmarkList;
