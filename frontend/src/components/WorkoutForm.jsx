import { useState } from 'react';
import { createWorkout } from '../utils/api.js';

function WorkoutForm({ refreshWorkouts }) {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { 
      title, 
      reps: Number(reps), 
      load: Number(load) 
    };

    try {
      const response = await createWorkout(workout);

      if (response.ok) {
        console.log('Workout aangemaakt!', response.data);
        setTitle('');
        setReps('');
        setLoad('');
        setError('');
        refreshWorkouts();
      } else {
        const message = response.data?.error || 'Workout toevoegen mislukt';
        console.error('Error:', message);
        setError(message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('De backend is niet bereikbaar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Toevoegen</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default WorkoutForm;
