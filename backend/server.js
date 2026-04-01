// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import workoutRoutes from './src/routes/workoutRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes); // Nieuw!

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend draait' });
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => {
    console.log('Verbonden met MongoDB');
  })
  .catch((error) => {
    console.error('Database verbinding mislukt:', error.message);
  });
  
