import { useState } from 'react';
import { updateWorkoutById } from '../utils/api.js';

function UpdateWorkout({ workoutId, currentTitle, currentReps, currentLoad, refreshWorkouts }) {
  const [title, setTitle] = useState(currentTitle);
  const [reps, setReps] = useState(currentReps);
  const [load, setLoad] = useState(currentLoad);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedWorkout = { 
      title, 
      reps: Number(reps), 
      load: Number(load) 
    };

    try {
      const response = await updateWorkoutById(workoutId, updatedWorkout);

      if (response.ok) {
        console.log('Workout aangepast!', response.data);
        refreshWorkouts();
      } else {
        console.error('Error:', response.data?.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        placeholder="Load (kg)"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />
      <button type="submit">Aanpassen</button>
    </form>
  );
}

export default UpdateWorkout;
