import React, { useState, useEffect } from 'react';
import './FileReadingComponent.css';

const FileReadingComponent = () => {
  // State initialization
  const [fileData, setFileData] = useState([]);
  const [selectedTable, setSelectedTable] = useState('songs'); // Default selected table

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from JSON files
      const responses = await Promise.all([
        fetch('/streamingData/StreamingHistory0.json'),
        fetch('/streamingData/StreamingHistory1.json'),
        fetch('/streamingData/StreamingHistory2.json'),
        fetch('/streamingData/StreamingHistory3.json'),
        fetch('/streamingData/StreamingHistory4.json'),
        fetch('/streamingData/StreamingHistory5.json'),
        fetch('/streamingData/StreamingHistory6.json'),
        fetch('/streamingData/StreamingHistory7.json'),
        fetch('/streamingData/StreamingHistory8.json'),
      ]);

      // Parse the responses
      const jsonData = await Promise.all(responses.map((response) => response.json()));

      // Combine data from multiple files into a single array
      const mergedData = jsonData.reduce((acc, fileData) => acc.concat(fileData), []);

      // Update fileData state with merged data
      setFileData(mergedData);
    };

    fetchData();
  }, []);

  const renderResults = () => {
    // Calculate count and total time for each song 

    // Objects to store count and total time
    const counts = {};
    const times = {};

    fileData.forEach((entry) => {
      //unique key for each song trackName or artistName
      const key = selectedTable === 'songs' ? entry.trackName : entry.artistName;
      //increment the count if the song already exists
      counts[key] = (counts[key] || 0) + 1;
      //increment the total time played by msPlayed
      times[key] = (times[key] || 0) + entry.msPlayed;
    });

    // Convert total time to dd days hh hours mm minutes ss seconds format
    const formatTime = (ms) => {
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
    };

    // Create an array of data for rendering
    const data = Object.keys(counts).map((key) => ({
      title: key,
      count: counts[key],
      time: formatTime(times[key]),
    }));

    // Sort the array by count in descending order
    data.sort((a, b) => b.count - a.count);


    return (
      <div>
        <label>
          <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} className="select-input">
            <option value="songs">Songs by Count</option>
            <option value="artists">Artists by Count</option>
          </select>
        </label>
        <table className="song-table">
          <thead>
            <tr>
              <th>{selectedTable === 'songs' ? 'Song Title' : 'Artist Name'}</th>
              <th>Count</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.title}</td>
                <td>{entry.count}</td>
                <td>{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return <div>{renderResults()}</div>;
};

export default FileReadingComponent;


