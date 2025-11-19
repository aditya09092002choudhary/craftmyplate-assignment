export interface Room {
  id: string;
  name: string;
  baseHourlyRate: number;
  capacity: number;
}

export const rooms: Room[] = [
  { id: '101', name: 'Cabin 1', baseHourlyRate: 300, capacity: 4 },
  { id: '102', name: 'Cabin 2', baseHourlyRate: 450, capacity: 8 },
  { id: '103', name: 'Conference Hall', baseHourlyRate: 600, capacity: 20 },
  { id: '104', name: 'Board Room', baseHourlyRate: 500, capacity: 12 },
  { id: '105', name: 'Meeting Pod', baseHourlyRate: 200, capacity: 2 }
];