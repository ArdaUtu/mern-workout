function DeleteWorkout({ workoutId, workoutTitle, token, onWorkoutDeleted }) {
  const handleDelete = async () => {
    if (!confirm(`Weet je zeker dat je "${workoutTitle}" wilt verwijderen?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Workout verwijderd!', data);
        onWorkoutDeleted();
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <button type="button" onClick={handleDelete}>
      Verwijderen
    </button>
  );
}

export default DeleteWorkout;
