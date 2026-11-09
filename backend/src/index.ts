import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import venueRoutes from './routes/venueRoutes.ts';
import bookingRoutes from './routes/bookingRoutes.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', venueRoutes);
app.use('/api', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
