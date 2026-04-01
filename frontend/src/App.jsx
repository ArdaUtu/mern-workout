import { useEffect, useState } from 'react';
import WorkoutForm from './components/WorkoutForm.jsx';
import WorkoutList from './components/WorkoutList.jsx';
import { getWorkouts } from './utils/api.js';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  const refreshWorkouts = async () => {
    try {
      const response = await getWorkouts();

      if (!response.ok) {
        throw new Error(response.data?.error || 'Workouts ophalen mislukt');
      }

      setWorkouts(Array.isArray(response.data) ? response.data : []);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'De backend is niet bereikbaar');
    }
  };

  useEffect(() => {
    refreshWorkouts();
  }, []);

  return (
    <div className="App">
      <h1>Workouts</h1>
      {error && <p>{error}</p>}
      <WorkoutForm refreshWorkouts={refreshWorkouts} />
      <WorkoutList workouts={workouts} refreshWorkouts={refreshWorkouts} />
    </div>
  );
}

export default App;
