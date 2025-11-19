import { v4 as uuidv4 } from 'uuid';
import { Booking, CreateBookingDTO } from '../models/Booking';
import { Room } from '../models/Room';
import { PricingService } from '../utils/pricing';
import { ValidationService } from '../utils/validation';

export class BookingService {
  private bookings: Booking[] = [];

  createBooking(
    dto: CreateBookingDTO,
    room: Room
  ): { booking?: Booking; error?: string } {
    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);

    // Validate times
    const validationError = ValidationService.validateBookingTimes(startTime, endTime);
    if (validationError) {
      return { error: validationError };
    }

    // Check for conflicts
    const conflict = this.checkConflict(dto.roomId, startTime, endTime);
    if (conflict) {
      return { error: conflict };
    }

    // Calculate price
    const totalPrice = PricingService.calculatePrice(
      startTime,
      endTime,
      room.baseHourlyRate
    );

    // Create booking
    const booking: Booking = {
      bookingId: uuidv4(),
      roomId: dto.roomId,
      userName: dto.userName,
      startTime,
      endTime,
      totalPrice,
      status: 'CONFIRMED',
      createdAt: new Date()
    };

    this.bookings.push(booking);
    return { booking };
  }

  cancelBooking(bookingId: string): { success: boolean; error?: string } {
    const booking = this.bookings.find(b => b.bookingId === bookingId);

    if (!booking) {
      return { success: false, error: 'Booking not found' };
    }

    if (booking.status === 'CANCELLED') {
      return { success: false, error: 'Booking already cancelled' };
    }

    const cancellationError = ValidationService.canCancelBooking(booking.startTime);
    if (cancellationError) {
      return { success: false, error: cancellationError };
    }

    booking.status = 'CANCELLED';
    return { success: true };
  }

  getBookings(): Booking[] {
    return this.bookings;
  }

  getBookingById(bookingId: string): Booking | undefined {
    return this.bookings.find(b => b.bookingId === bookingId);
  }

  private checkConflict(
    roomId: string,
    startTime: Date,
    endTime: Date
  ): string | null {
    const conflicts = this.bookings.filter(booking => {
      if (booking.roomId !== roomId) return false;
      if (booking.status === 'CANCELLED') return false;

      // Check if times overlap
      return startTime < booking.endTime && endTime > booking.startTime;
    });

    if (conflicts.length > 0) {
      const conflict = conflicts[0];
      const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit'
        });
      };

      return `Room already booked from ${formatTime(conflict.startTime)} to ${formatTime(conflict.endTime)}`;
    }

    return null;
  }
}

// Shared singleton instance used by routes so services see the same in-memory bookings
export const bookingService = new BookingService();