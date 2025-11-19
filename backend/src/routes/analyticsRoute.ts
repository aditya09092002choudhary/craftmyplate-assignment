
import { Router, Request, Response } from 'express';
import { AnalyticsService } from '../services/analyticsService';
import { bookingService } from '../services/bookingService';
import { rooms } from '../models/Room';

const router = Router();
const analyticsService = new AnalyticsService();

router.get('/', (req: Request, res: Response) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Missing from or to date parameters' });
  }

  const fromDate = new Date(from as string);
  const toDate = new Date(to as string);

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  const analytics = analyticsService.generateAnalytics(
    bookingService.getBookings(),
    rooms,
    fromDate,
    toDate
  );

  return res.json(analytics);
});

export default router;