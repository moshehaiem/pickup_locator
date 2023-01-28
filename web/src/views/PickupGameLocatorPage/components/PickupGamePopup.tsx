import React, { useCallback, useState } from 'react';

const PickupGamePopup = ({ location }: any): JSX.Element => {
  const [loc, setLoc] = useState(location);
  const isSubmittable = !(loc.athletesPresent && loc.athletesNeeded && loc.startTime && loc.endTime && loc.startTime < loc.endTime);

  const handleSubmit = useCallback((event: any): void => {
    event.preventDefault();
    console.log(loc);
  }, [loc]);

  return (
    <form onSubmit={handleSubmit}>
    <label>Athletes Present
    <input 
      type="number" 
      min={0}
      name="athletesPresent" 
      value={loc.athletesPresent || ""} 
      onChange={(event) => setLoc({...loc, [event.target.name]: event.target.valueAsNumber})}
    />
    </label>
    <br />
    <label>Athletes Needed
      <input 
        type="number" 
        min={0}
        name="athletesNeeded" 
        value={loc.athletesNeeded || ""} 
        onChange={(event) => setLoc({...loc, [event.target.name]: event.target.valueAsNumber})}
      />
      </label>
      <br />
      <label>Date
      <input 
        type="date" 
        name="date" 
        value={loc.date || ""}
        onChange={(event) => setLoc({...loc, [event.target.name]: event.target.value})}
      />
      </label>
      <br />
      <label>Start Time
      <input 
        type="time" 
        name="startTime" 
        value={loc.startTime || ""}
        onChange={(event) => setLoc({...loc, [event.target.name]: event.target.value})}
      />
      </label>
      <br />
      <label>End Time
      <input 
        type="time" 
        name="endTime" 
        value={loc.endTime || ""} 
        onChange={(event) => setLoc({...loc, [event.target.name]: event.target.value})}
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
      <input type="submit" disabled={isSubmittable} />
    </form>
  );
}

export default PickupGamePopup;