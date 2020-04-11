import React, { useState } from 'react';

export default function App() {
  const [bands, setBand] = useState(['Ghost', 'Slayer', 'Kreator']);

  const [newBand, setNewBand] = useState('');

  function handleAdd() {
    setBand([...bands, newBand]);
    setNewBand('');
  }

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
