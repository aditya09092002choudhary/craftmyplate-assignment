const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';

export interface Room {
  id: string;
  name: string;
  baseHourlyRate: number;
  capacity: number;
}

export interface Booking {
  bookingId: string;
  roomId: string;
  userName: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
}

export interface CreateBookingDTO {
  roomId: string;
  userName: string;
  startTime: string;
  endTime: string;
}

export interface AnalyticsResult {
  roomId: string;
  roomName: string;
  totalHours: number;
  totalRevenue: number;
}

export const api = {
  // Rooms
  getRooms: async (): Promise<Room[]> => {
    const response = await fetch(`${API_BASE}/rooms`);
    if (!response.ok) throw new Error('Failed to fetch rooms');
    return response.json();
  },

  // Bookings
  createBooking: async (data: CreateBookingDTO): Promise<Booking> => {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to create booking');
    return result;
  },

  getBookings: async (): Promise<Booking[]> => {
    const response = await fetch(`${API_BASE}/bookings`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },

  cancelBooking: async (bookingId: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/bookings/${bookingId}/cancel`, {
      method: 'POST'
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to cancel booking');
  },

  // Analytics
  getAnalytics: async (from: string, to: string): Promise<AnalyticsResult[]> => {
    const response = await fetch(`${API_BASE}/analytics?from=${from}&to=${to}`);
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return response.json();
  }
};