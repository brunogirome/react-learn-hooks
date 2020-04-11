import React, { useState, useEffect, useMemo, useCallback } from 'react';

export default function App() {
  const [bands, setBands] = useState([]);

  const [newBand, setNewBand] = useState('');

  // useCallback:
  //
  // When react re-render the component, all functions are re-created as well,
  // so, to stop this kind of "unnecessary" reloading job, you can use the
  // "useCallBack". Whith it, it only will re-create the function when the
  // states in second parameter is changed
  //
  // IMPORTANT: Is only used when you need to monitor some function/state. In
  // theses cases, the usage is dispensable
  const handleAdd = useCallback(
    e => {
      e.preventDefault();

      setBands([...bands, newBand]);
      setNewBand('');
    },
    [bands, newBand]
  );

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
