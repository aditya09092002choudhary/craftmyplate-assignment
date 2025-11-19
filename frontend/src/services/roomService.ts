import { api } from "./api";

export const roomService = {
  list: () => api.getRooms()
};
