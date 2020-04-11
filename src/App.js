import React, { useState, useEffect, useMemo } from 'react';

export default function App() {
  const [bands, setBands] = useState([]);

  const [newBand, setNewBand] = useState('');

  function handleAdd() {
    setBands([...bands, newBand]);
    setNewBand('');
  }

  useEffect(() => {
    const storageBands = localStorage.getItem('bands');

    if (storageBands) {
      setBands(JSON.parse(storageBands));
    }
    // Equivalenet to component did unmount:
    // return () => {};
  }, []);

  useEffect(() => {
    localStorage.setItem('bands', JSON.stringify(bands));
  }, [bands]);

  function handleClear() {
    localStorage.setItem('bands', JSON.stringify([]));
    setBands([]);
  }

  return (
    <>
      <ul>
        {bands.map(band => (
          <li key={band}>{band}</li>
        ))}
      </ul>
      <strong>You have {bands.length} bands added.</strong>
      <input
        type="text"
        value={newBand}
        onChange={e => setNewBand(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add a band
      </button>
      <br />
      <button type="button" onClick={handleClear}>
        Claer
      </button>
    </>
  );
}
