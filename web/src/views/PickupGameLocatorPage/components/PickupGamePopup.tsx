import React, { useCallback, useState } from 'react';
import useCreateLocation from '../../../hooks/location/useCreateLocation';

const PickupGamePopup = ({ location }: any): JSX.Element => {
  const [loc, setLoc] = useState(location);
  const isSubmittable = !(loc.athletes_present && loc.athletes_needed && loc.start_time && loc.end_time && loc.start_time < loc.end_time);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const createLocationMutation = useCreateLocation();

  const handleSubmit = useCallback((event: any): void => {
    event.preventDefault();
    setLoadingSubmit(true);
    createLocationMutation.mutate(loc, {
      onError: error => {
        console.log('Location creation failed', error.response?.data.message);
      },
      onSuccess: response => {
        console.log('Location creation success', `${response.data.name} successfully created.`);
      },
      onSettled: () => {
        setLoadingSubmit(false);
      },
    });
  }, [createLocationMutation, loc]);

  return (
    <form onSubmit={handleSubmit}>
    <label>Athletes Present
    <input 
      type="number" 
      min={0}
      name="athletes_present" 
      value={loc.athletes_present || ""} 
      onChange={(event) => setLoc({...loc, [event.target.name]: event.target.valueAsNumber})}
    />
    </label>
    <br />
    <label>Athletes Needed
      <input 
        type="number" 
        min={0}
        name="athletes_needed" 
        value={loc.athletes_needed || ""} 
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
        name="start_time" 
        value={loc.start_time || ""}
        onChange={(event) => setLoc({...loc, [event.target.name]: event.target.value})}
      />
      </label>
      <br />
      <label>End Time
      <input 
        type="time" 
        name="end_time" 
        value={loc.end_time || ""} 
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
      <input type="submit" disabled={isSubmittable || loadingSubmit} />
    </form>
  );
}

export default PickupGamePopup;