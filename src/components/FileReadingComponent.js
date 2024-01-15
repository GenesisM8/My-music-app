// src/components/FileReadingComponent.js
import React, { useState, useEffect } from 'react';
import './FileReadingComponent.css';

const FileReadingComponent = () => {
  const [fileData, setFileData] = useState([]);

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

        // Combine data from multiple files
        const mergedData = jsonData.reduce((acc, fileData) => acc.concat(fileData), []);

        setFileData(mergedData);
    };

    fetchData();
  }, []);

  const renderResults = () => {
    // Calculate count and total time for each song

    const songCounts = {};
    //store total time played
    const songTimes = {};

    fileData.forEach((song) => {
      //unique key for each song trackName
      const key = song.trackName;
      //increment the count if the song already exists
      songCounts[key] = (songCounts[key] || 0) + 1;
      //increment the total time played by msPlayed
      songTimes[key] = (songTimes[key] || 0) + song.msPlayed;
    });

    // Convert total time to dd days hh hours mm minutes ss seconds format
    const formatTime = (ms) => {
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
    };

    // Create an array of song data for rendering
    const songData = Object.keys(songCounts).map((key) => ({
      title: key,
      count: songCounts[key],
      time: formatTime(songTimes[key]),
    }));

    // Sort the array by count in descending order
    songData.sort((a, b) => b.count - a.count);

    // Example: Displaying song titles, counts, and time
    return (
     <div>
        <h2>Songs by Count</h2>
        <table className="song-table">
          <thead>
            <tr>
              <th>Song Title</th>
              <th>Count</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {songData.map((entry, index) => (
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


