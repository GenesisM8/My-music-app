// src/App.js
import React, { useState } from 'react';
import FileReadingComponent from './components/FileReadingComponent';

const App = () => {
  const [musicData, setMusicData] = useState(null);

  const handleFileRead = (data) => {
    setMusicData(data);
    // Process the data further as needed
  };

  return (
    <div>
      <h1>Music Taste</h1>
      <FileReadingComponent onFileRead={handleFileRead} />
    </div>
  );
};

export default App;

