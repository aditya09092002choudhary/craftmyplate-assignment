import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import roomRoutes from './routes/roomsRoute';
import bookingRoutes from './routes/bookingsRoute';
import analyticsRoutes from './routes/analyticsRoute';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = process.env.CORS_ORIGINS?.split(',').map(s => s.trim()).filter(Boolean) || [];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    // Allow requests with no origin (e.g., server-to-server or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// Ensure preflight requests are handled
app.options('*', cors(corsOptions));
app.use(express.json());

// Request logging
app.use((req: Request, _res: Response, next: any) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: any) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});

export default app;