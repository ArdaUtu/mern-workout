// src/models/Workout.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema = regels voor workout
const workoutSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  reps: {
    type: Number,
    required: true,
    min: 1    
  },
  load: {
    type: Number,
    required: true
  },
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
  timestamps: true
});

// Model = object voor maken/ophalen/aanpassen/verwijderen
const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;