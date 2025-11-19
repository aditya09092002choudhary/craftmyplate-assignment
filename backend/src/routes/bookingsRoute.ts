import { Router, Request, Response } from 'express';
import { bookingService } from '../services/bookingService';
import { rooms } from '../models/Room';
import { CreateBookingDTO } from '../models/Booking';

const router = Router();
// use shared singleton `bookingService` from services

router.post('/', (req: Request, res: Response) => {
  const dto: CreateBookingDTO = req.body;

  // Validate request
  if (!dto.roomId || !dto.userName || !dto.startTime || !dto.endTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Find room
  const room = rooms.find(r => r.id === dto.roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  // Create booking
  const result = bookingService.createBooking(dto, room);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  return res.status(201).json(result.booking);
});

router.get('/', (_req: Request, res: Response) => {
  return res.json(bookingService.getBookings());
});

router.get('/:id', (req: Request, res: Response) => {
  const booking = bookingService.getBookingById(req.params.id);
  
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  return res.json(booking);
});

router.post('/:id/cancel', (req: Request, res: Response) => {
  const { id } = req.params;
  const result = bookingService.cancelBooking(id);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  return res.json({ message: 'Booking cancelled successfully' });
});

export default router;