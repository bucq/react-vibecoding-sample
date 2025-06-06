export interface MeetingRoom {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'available' | 'booked' | 'in-use';
}

export const meetingRooms: MeetingRoom[] = [
  { id: 'room1', name: 'Room Alpha', x: 50, y: 50, status: 'available' },
  { id: 'room2', name: 'Room Beta', x: 150, y: 100, status: 'booked' },
  { id: 'room3', name: 'Room Gamma', x: 250, y: 150, status: 'in-use' },
];
