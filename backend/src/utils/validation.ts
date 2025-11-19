export class ValidationService {
  static validateBookingTimes(startTime: Date, endTime: Date): string | null {
    const now = new Date();

    if (startTime >= endTime) {
      return 'Start time must be before end time';
    }

    if (startTime < now) {
      return 'Start time cannot be in the past';
    }

    const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    if (durationHours > 12) {
      return 'Booking duration cannot exceed 12 hours';
    }

    return null;
  }

  static canCancelBooking(startTime: Date): string | null {
    const now = new Date();
    const hoursUntilStart = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilStart <= 2) {
      return 'Cancellation must be at least 2 hours before start time';
    }

    return null;
  }
}