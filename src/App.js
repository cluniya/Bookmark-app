import React from 'react';
import { BookmarksProvider } from './components/Bookmrk_context/BookmarksContext';
import AddUrlForm from './components/Layout/AddUrlForm';
import BookmarkList from './components/Layout/BookmarkList';

const App = () => {
  return (
    <BookmarksProvider>
      <div className="container">
        <h1>Bookmark App</h1>
        <AddUrlForm />
        <BookmarkList />
      </div>
    </BookmarksProvider>
  );
};

export default App;
