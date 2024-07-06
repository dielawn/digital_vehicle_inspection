// StateSelector.jsx
import React, { useState } from 'react';
import { states } from '../states';

const StateSelector = ({ state, setState}) => {
  const [selectedState, setSelectedState] = useState('');

  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <div>
      <label htmlFor="state-selector">State: </label>
      <select
        id="state-selector"
        value={state? state : ''}
        onChange={handleChange}
      >
        <option value="" disabled>Select a state</option>
        {states.map((st) => (
          <option key={st} value={st}>
            {st}
          </option>
        ))}
      </select>
      <p>Selected State: {state}</p>
    </div>
  );
};

export default StateSelector;
