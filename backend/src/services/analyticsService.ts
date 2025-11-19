import { Booking, AnalyticsResult } from '../models/Booking';
import { Room } from '../models/Room';

export class AnalyticsService {
  generateAnalytics(
    bookings: Booking[],
    rooms: Room[],
    fromDate: Date,
    toDate: Date
  ): AnalyticsResult[] {
    const roomMap = new Map(rooms.map(r => [r.id, r]));
    const analyticsMap = new Map<string, { hours: number; revenue: number }>();

    // Set toDate to end of day
    const endOfDay = new Date(toDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Filter bookings
    const filteredBookings = bookings.filter(booking => {
      if (booking.status !== 'CONFIRMED') return false;

      const bookingDate = new Date(booking.startTime);
      return bookingDate >= fromDate && bookingDate <= endOfDay;
    });

    // Aggregate by room
    filteredBookings.forEach(booking => {
      const hours = (booking.endTime.getTime() - booking.startTime.getTime()) / (1000 * 60 * 60);

      const existing = analyticsMap.get(booking.roomId) || { hours: 0, revenue: 0 };
      analyticsMap.set(booking.roomId, {
        hours: existing.hours + hours,
        revenue: existing.revenue + booking.totalPrice
      });
    });

    // Convert to result array
    const results: AnalyticsResult[] = [];
    analyticsMap.forEach((data, roomId) => {
      const room = roomMap.get(roomId);
      if (room) {
        results.push({
          roomId,
          roomName: room.name,
          totalHours: Math.round(data.hours * 10) / 10,
          totalRevenue: Math.round(data.revenue * 100) / 100
        });
      }
    });

    return results;
  }
}