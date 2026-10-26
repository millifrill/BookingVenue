import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/venues', (_req: Request, res: Response) => {
   res.json({ message: 'Backend works!' });
});

app.post('/api/test', (req: Request, res: Response) => {
   res.json(req.body);
});

app.listen(3000, () => {
   console.log('Server running on port 3000');
});
