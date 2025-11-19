import { api } from "./api";

export const bookingService = {
  create: (payload: { roomId: string; userName: string; startTime: string; endTime: string }) =>
    api.createBooking(payload),
  list: () => api.getBookings(),
  cancel: (id: string) => api.cancelBooking(id)
};
