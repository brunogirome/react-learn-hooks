import React, { useState, useEffect, useMemo } from 'react';

export default function App() {
  const [bands, setBands] = useState([]);

  const [newBand, setNewBand] = useState('');

  function handleAdd(e) {
    e.preventDefault();

    setBands([...bands, newBand]);
    setNewBand('');
  }

  function handleClear() {
    localStorage.setItem('bands', JSON.stringify([]));
    setBands([]);
  }

  useEffect(() => {
    const storageBands = localStorage.getItem('bands');

    if (storageBands) {
      setBands(JSON.parse(storageBands));
    }
    // Equivalent to component did un-mount:
    // return () => {};
  }, []);

  useEffect(() => {
    localStorage.setItem('bands', JSON.stringify(bands));
  }, [bands]);

  // useMemo is used for re-calculating something when some dependencies change.
  // Generally used for specific calculations based on some state changes
  const bandsSize = useMemo(() => bands.length, [bands]);

  return (
    <>
      <ul>
        {bands.map(band => (
          <li key={band}>{band}</li>
        ))}
      </ul>
      <strong>You have {bandsSize} bands added.</strong>
      <form>
        <input
          type="text"
          value={newBand}
          onChange={e => setNewBand(e.target.value)}
        />
        <button type="submit" onClick={handleAdd}>
          Add a band
        </button>
      </form>
      <br />
      <button type="button" onClick={handleClear}>
        Clear bands list
      </button>
    </>
  );
}
