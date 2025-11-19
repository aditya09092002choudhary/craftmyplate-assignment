export class PricingService {
  private static readonly PEAK_MULTIPLIER = 1.5;

  static calculatePrice(
    startTime: Date,
    endTime: Date,
    baseRate: number
  ): number {
    let totalPrice = 0;
    let currentTime = new Date(startTime);

    while (currentTime < endTime) {
      const nextHour = new Date(currentTime);
      nextHour.setHours(currentTime.getHours() + 1);
      nextHour.setMinutes(0);
      nextHour.setSeconds(0);

      const slotEnd = nextHour > endTime ? endTime : nextHour;
      const slotMinutes = (slotEnd.getTime() - currentTime.getTime()) / (1000 * 60);
      const slotHours = slotMinutes / 60;

      const rate = this.isPeakHour(currentTime)
        ? baseRate * this.PEAK_MULTIPLIER
        : baseRate;

      totalPrice += rate * slotHours;
      currentTime = slotEnd;
    }

    return Math.round(totalPrice * 100) / 100;
  }

  private static isPeakHour(date: Date): boolean {
    const day = date.getDay();
    const hour = date.getHours();

    // Weekend = not peak
    if (day === 0 || day === 6) return false;

    // Peak: 10AM-1PM (10,11,12) or 4PM-7PM (16,17,18)
    return (hour >= 10 && hour < 13) || (hour >= 16 && hour < 19);
  }
}

