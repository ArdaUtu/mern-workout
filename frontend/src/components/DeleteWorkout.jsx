import { deleteWorkoutById } from '../utils/api.js';

function DeleteWorkout({ workoutId, workoutTitle, refreshWorkouts }) {
  
  const handleDelete = async () => {
    // Bevestiging vragen
    if (!confirm(`Weet je zeker dat je "${workoutTitle}" wilt verwijderen?`)) {
      return;
    }

    try {
      const response = await deleteWorkoutById(workoutId);

      if (response.ok) {
        console.log('Workout verwijderd!', response.data);
        refreshWorkouts();
      } else {
        console.error('Error:', response.data?.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      Verwijderen
    </button>
  );
}

export default DeleteWorkout;
