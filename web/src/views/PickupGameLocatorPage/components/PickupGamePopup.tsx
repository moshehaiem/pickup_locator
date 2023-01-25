import React, { useCallback, useState } from 'react';

const PickupGamePopup = ({ location }: any): JSX.Element => {
  const [loc, setLoc] = useState(location);

  const handleSubmit = useCallback((): void => {
    console.log(loc);
  }, [loc]);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
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
      </fieldset>
    </form>
  );
}

export default PickupGamePopup;