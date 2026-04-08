import React from 'react';
import WorkoutItem from './WorkoutItem';

const WorkoutList = ({ workouts, refreshWorkouts }) => {
  return (
    <div>
      {workouts.length === 0 ? (
        <p>Geen workouts gevonden</p>
      ) : (
        workouts.map(workout => (
          <WorkoutItem key={workout._id} workout={workout} refreshWorkouts={refreshWorkouts} />
        ))
      )}
    </div>
  );
};

export default WorkoutList;