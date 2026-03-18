import { useEffect, useState } from 'react';
import DeleteWorkout from './components/DeleteWorkout.jsx';
import UpdateWorkout from './components/UpdateWorkout.jsx';
import WorkoutForm from './components/WorkoutForm.jsx';
import WorkoutItem from './components/WorkoutItem.jsx';
import WorkoutList from './components/WorkoutList.jsx';

function App() {
  const [workouts, setWorkouts] = useState([]);

  const refreshWorkouts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/workouts');
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    refreshWorkouts();
  }, []);

  return (
    <div className="App">
      <h1>Workouts</h1>
      <WorkoutForm refreshWorkouts={refreshWorkouts} />
      <WorkoutList workouts={workouts} refreshWorkouts={refreshWorkouts} />
    </div>
  );
}

export default App;