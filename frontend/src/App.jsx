import { useEffect, useState } from 'react';

function App() {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');

    if (!token) {
        console.log('Niet ingelogd');
        return;
    }
    try {
     const response = await fetch('http://localhost:4000/api/workouts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="App">
      <h1>Workouts</h1>
      {workouts.length === 0 ? (
        <p>Geen workouts gevonden</p>
      ) : (
        workouts.map(workout => (
          <div key={workout._id}>
            <h3>{workout.title}</h3>
            <p>Reps: {workout.reps}</p>
            <p>Load: {workout.load} kg</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;