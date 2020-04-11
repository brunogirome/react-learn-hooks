import React, { useState, useEffect } from 'react';

export default function App() {
  const [bands, setBand] = useState(['Ghost', 'Slayer', 'Kreator']);

  const [newBand, setNewBand] = useState('');

  function handleAdd() {
    setBand([...bands, newBand]);
    setNewBand('');
  }

  useEffect(() => {
    alert('Did mount?');

    // Equivalenet to component did unmount
    return () => {};
  }, []);

  useEffect(() => {
    alert(`New band added!, new size: ${bands.length}`);
  }, [bands]);

  return (
    <>
      <ul>
        {bands.map(band => (
          <li key={band}>{band}</li>
        ))}
        <input
          type="text"
          value={newBand}
          onChange={e => setNewBand(e.target.value)}
        />
        <button type="button" onClick={handleAdd}>
          Add a band
        </button>
      </ul>
    </>
  );
}
