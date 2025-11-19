
import { useState, useEffect, useCallback } from 'react';
import { api, Booking, CreateBookingDTO } from '../services/api';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const createBooking = async (data: CreateBookingDTO) => {
    const booking = await api.createBooking(data);
    await fetchBookings();
    return booking;
  };

  const cancelBooking = async (bookingId: string) => {
    await api.cancelBooking(bookingId);
    await fetchBookings();
  };

  return { bookings, loading, error, createBooking, cancelBooking, refetch: fetchBookings };
};
