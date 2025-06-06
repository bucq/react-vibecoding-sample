import React from 'react';
import { MeetingRoom } from '../data/meetingRooms'; // Adjust path as needed

interface Props {
  room: MeetingRoom;
}

const MeetingRoomStatus: React.FC<Props> = ({ room }) => {
  const getStatusColor = (status: MeetingRoom['status']) => {
    if (status === 'available') return 'bg-green-500';
    if (status === 'booked') return 'bg-yellow-500';
    if (status === 'in-use') return 'bg-red-500';
    return 'bg-gray-300';
  };

  return (
    <div
      title={`${room.name} - ${room.status}`}
      className={`absolute w-5 h-5 rounded-full border-2 border-white shadow-md ${getStatusColor(room.status)}`}
      style={{ left: `${room.x}px`, top: `${room.y}px` }}
    >
      <span className="sr-only">{room.name} - {room.status}</span>
    </div>
  );
};

export default MeetingRoomStatus;
