import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/venues', (_req, res) => {
   res.json({ message: 'Backend works!' });
});

app.listen(3000, () => {
   console.log('Server running on port 3000');
});
