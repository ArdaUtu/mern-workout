import { useEffect, useState } from 'react';
import Login from './components/Login';
import WorkoutForm from './components/WorkoutForm';
import UpdateWorkout from './components/UpdateWorkout';
import DeleteWorkout from './components/DeleteWorkout';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchWorkouts = async () => {
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
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data);
      } else {
        console.error('Fout bij ophalen workouts:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [token]);

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Uitgelogd');
    setToken(null);
    
    
};

  return (
    <div className="App">
      {!token ? (
        <Login />
      ) : (
        <>
          <h1>Workouts</h1>
          <button onClick={handleLogout}>Loguit</button>
          <WorkoutForm token={token} onWorkoutAdded={fetchWorkouts} />
          {workouts.length === 0 ? (
            <p>Geen workouts gevonden</p>
          ) : (
            workouts.map(workout => (
              <div key={workout._id}>
                <h3>{workout.title}</h3>
                <p>Reps: {workout.reps}</p>
                <p>Load: {workout.load} kg</p>
                <UpdateWorkout
                  workoutId={workout._id}
                  currentTitle={workout.title}
                  currentReps={workout.reps}
                  currentLoad={workout.load}
                  token={token}
                  onWorkoutUpdated={fetchWorkouts}
                />
                <DeleteWorkout
                  workoutId={workout._id}
                  workoutTitle={workout.title}
                  token={token}
                  onWorkoutDeleted={fetchWorkouts}
                />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default App;
