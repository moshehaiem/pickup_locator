import React, { useCallback, useState } from 'react';
import useCreateLocation from '../../../hooks/location/useCreateLocation';
import useDeleteLocation from '../../../hooks/location/useDeleteLocation';
import useUpdateLocation from '../../../hooks/location/useUpdateLocation';
import { CreateOrUpdateLocation } from '../../../types/CreateOrUpdateLocation';

interface IPickupGamePopupProps {
  location: CreateOrUpdateLocation;
}

const PickupGamePopup = ({ location }: IPickupGamePopupProps): JSX.Element => {
  const [loc, setLoc] = useState(location);
  const isSubmittable = !(loc.athletes_present && loc.athletes_needed && loc.start_time && loc.end_time && loc.start_time < loc.end_time);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const createLocationMutation = useCreateLocation();
  const updateLocationMutation = useUpdateLocation();
  const deleteLocationMutation = useDeleteLocation();

  const handleSubmit = useCallback((): void => {
    setLoadingSubmit(true);
    if(loc.location_id){
      updateLocationMutation.mutate(loc, {
        onError: () => {
          console.log('Location update failed');
        },
        onSuccess: () => {
          console.log('Location update success');
        },
        onSettled: () => {
          setLoadingSubmit(false);
        },
      });
    } else{
      createLocationMutation.mutate(loc, {
        onError: () => {
          console.log('Location creation failed');
        },
        onSuccess: () => {
          console.log('Location creation success');
        },
        onSettled: () => {
          setLoadingSubmit(false);
        },
      });
    }
  }, [createLocationMutation, loc, updateLocationMutation]);

  const handleDelete = useCallback((): void => {
    setLoadingSubmit(true);
    if(loc.location_id){
      deleteLocationMutation.mutate(loc.location_id, {
        onError: () => {
          console.log('Location delete failed');
        },
        onSuccess: () => {
          console.log('Location delete success');
        },
        onSettled: () => {
          setLoadingSubmit(false);
        },
      });
    }
  }, [deleteLocationMutation, loc.location_id]);

  return (
    <div>
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
      <button disabled={!loc.location_id} onClick={handleDelete}>delete</button>
      <button disabled={isSubmittable || loadingSubmit} onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default PickupGamePopup;