export interface Booking {
  bookingId: string;
  roomId: string;
  userName: string;
  startTime: Date;
  endTime: Date;
  totalPrice: number;
  status: 'CONFIRMED' | 'CANCELLED';
  createdAt: Date;
}

export interface CreateBookingDTO {
  roomId: string;
  userName: string;
  startTime: string;
  endTime: string;
}

export interface BookingResponse {
  bookingId: string;
  roomId: string;
  userName: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
}

export interface AnalyticsResult {
  roomId: string;
  roomName: string;
  totalHours: number;
  totalRevenue: number;
}