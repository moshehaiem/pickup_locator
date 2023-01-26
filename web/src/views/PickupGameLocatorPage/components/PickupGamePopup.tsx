import React, { useCallback, useState } from 'react';

const PickupGamePopup = ({ location }: any): JSX.Element => {
  const [loc, setLoc] = useState(location);

  const handleSubmit = useCallback((event: any): void => {
    event.preventDefault();
    console.log(loc);
  }, [loc]);
  console.log(loc);

  return (
    <form onSubmit={handleSubmit}>
    <label>Athletes Present
    <input 
      type="number" 
      name="athletesPresent" 
      value={loc.athletesPresent || ""} 
      onChange={(event) => setLoc({...loc, [event.target.name]: event.target.valueAsNumber})}
    />
    </label>
    <br />
    <label>Athletes Needed
      <input 
        type="number" 
        name="athletesNeeded" 
        value={loc.athletesNeeded || ""} 
        onChange={(event) => setLoc({...loc, [event.target.name]: event.target.valueAsNumber})}
      />
      </label>
      <br />
      <label>Start Time
      <input 
        type="datetime-local" 
        name="startTime" 
        value={loc.startTime || ""} 
        onInput={event => console.log(event)}
        onChange={(event) => setLoc({...loc, [event.target.name]: event.target.valueAsDate})}
      />
      </label>
      <br />
      <label>End Time
      <input 
        type="datetime-local" 
        name="endTime" 
        value={loc.endTime || ""} 
        onChange={(event) => setLoc({...loc, [event.target.name]: event.target.valueAsDate})}
      />
      </label>
      <br />
      <label>Message
      <input 
        type="text" 
        name="message" 
        value={loc.message || ""} 
        onChange={(event) => setLoc({...loc, [event.target.name]: event.target.value})}
      />
      </label>
      <br />
      <input type="submit" />
    </form>
  );
}

export default PickupGamePopup;