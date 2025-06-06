import React from 'react';
import Image from 'next/image'; // Using next/image for better performance
import Link from 'next/link';
import { meetingRooms } from '../data/meetingRooms'; // Adjust path as needed
import MeetingRoomStatus from './MeetingRoomStatus'; // Adjust path as needed

const OfficeView = () => {
  return (
    <div className="relative w-[800px] h-[600px]"> {/* Adjust width and height as needed */}
      <Image
        src="/images/officelayout.png"
        alt="Office Layout"
        width={800} // Specify image dimensions
        height={600} // Specify image dimensions
        className="object-contain" // Adjust as needed
      />
      {meetingRooms.map(room => (
        <Link key={room.id} href={`/room/${room.id}`} style={{ position: 'absolute', left: room.x, top: room.y }}>
          <MeetingRoomStatus room={room} />
        </Link>
      ))}
    </div>
  );
};

export default OfficeView;
