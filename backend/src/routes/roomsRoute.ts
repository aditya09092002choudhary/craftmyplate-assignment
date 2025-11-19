import { Router, Request, Response } from 'express';
import { rooms } from '../models/Room';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  return res.json(rooms);
});

router.get('/:id', (req: Request, res: Response) => {
  const room = rooms.find(r => r.id === req.params.id);
  
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  return res.json(room);
});

export default router;