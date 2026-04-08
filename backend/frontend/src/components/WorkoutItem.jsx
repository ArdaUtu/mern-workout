import React from 'react';
import DeleteWorkout from './DeleteWorkout';
import UpdateWorkout from './UpdateWorkout';

const WorkoutItem = ({ workout, refreshWorkouts }) => {
  return (
    <div>
      <h3>{workout.title}</h3>
      <p>Reps: {workout.reps}</p>
      <p>Load: {workout.load} kg</p>
      <UpdateWorkout 
        workoutId={workout._id} 
        currentTitle={workout.title} 
        currentReps={workout.reps} 
        currentLoad={workout.load}
        refreshWorkouts={refreshWorkouts}
      />
      <DeleteWorkout 
        workoutId={workout._id} 
        workoutTitle={workout.title}
        refreshWorkouts={refreshWorkouts}
      />
    </div>
  );
};

export default WorkoutItem;