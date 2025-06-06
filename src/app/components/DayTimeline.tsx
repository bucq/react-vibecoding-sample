// src/app/components/DayTimeline.tsx
import React from 'react';
import { MeetingRoom } from '../data/meetingRooms'; // Adjust path
import Link from 'next/link'; // For future navigation

interface Reservation {
  roomId: string;
  startTime: string; // e.g., "09:00"
  endTime: string;   // e.g., "10:30"
  date: string;      // e.g., "2023-10-27"
}

interface Props {
  date: Date;
  rooms: MeetingRoom[];
  reservations: Reservation[];
}

const generateTimeSlots = (startHour: number, endHour: number, intervalMinutes: number): string[] => {
  const slots: string[] = [];
  let currentTime = new Date();
  currentTime.setHours(startHour, 0, 0, 0);
  const endTimeDate = new Date();
  endTimeDate.setHours(endHour, 0, 0, 0);
  while (currentTime < endTimeDate) {
    slots.push(
      `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`
    );
    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }
  return slots;
};

const DayTimeline: React.FC<Props> = ({ date, rooms, reservations }) => {
  const timeSlots = generateTimeSlots(9, 18, 30); // 9 AM to 6 PM, 30-min intervals
  const currentDateStr = date.toISOString().split('T')[0];

  const isSlotBooked = (roomId: string, timeSlot: string): boolean => {
    const slotStartDateTime = new Date(`${currentDateStr}T${timeSlot}:00`);
    return reservations.some(res => {
      if (res.roomId !== roomId || res.date !== currentDateStr) return false;
      const resStartDateTime = new Date(`${res.date}T${res.startTime}:00`);
      const resEndDateTime = new Date(`${res.date}T${res.endTime}:00`);
      return slotStartDateTime >= resStartDateTime && slotStartDateTime < resEndDateTime;
    });
  };

  let totalSlots = 0;
  let bookedSlots = 0;

  rooms.forEach(room => {
    timeSlots.forEach(slot => {
      totalSlots++;
      if (isSlotBooked(room.id, slot)) {
        bookedSlots++;
      }
    });
  });

  const allSlotsBooked = totalSlots > 0 && totalSlots === bookedSlots;

  const handleSlotClick = (roomId: string, roomName: string, timeSlot: string, isBooked: boolean) => {
    if (isBooked) {
      console.log(`Room ${roomName} (${roomId}) at ${timeSlot} is already booked.`);
    } else {
      // For now, log to console. Later, this could navigate to a booking page for this slot.
      console.log(`Clicked available slot: Room ${roomName} (${roomId}) at ${timeSlot} on ${currentDateStr}. Navigating to booking page...`);
      // Example of placeholder navigation:
      // router.push(`/booking?roomId=${roomId}&time=${timeSlot}&date=${currentDateStr}`);
    }
  };

  const handleCheckAvailability = () => {
    // Placeholder for navigating to a page listing all available rooms for the day
    console.log(`Navigating to available rooms list for ${currentDateStr}...`);
    // router.push(`/available-rooms?date=${currentDateStr}`);
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg"> {/* Added shadow and rounded-lg to the container */}
      {allSlotsBooked ? (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-4 rounded-md" role="alert">
          <p className="font-bold">満室</p>
          <p>本日（{currentDateStr}）は全ての会議室が満室です。</p>
        </div>
      ) : (
        <div className="text-center my-4"> {/* my-4 for spacing */}
            <button
                onClick={handleCheckAvailability}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition-all duration-150"
            >
                本日（{currentDateStr}）の空き会議室一覧へ
            </button>
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Meeting Room</th>
            {timeSlots.map(slot => (
              <th key={slot} className="py-2 px-4 border-b text-sm">
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td className="py-2 px-4 border-b font-semibold">{room.name}</td>
              {timeSlots.map(slot => {
                const booked = isSlotBooked(room.id, slot);
                return (
                  <td
                    key={slot}
                    className={`py-2 px-4 border-b text-center ${
                      booked ? 'bg-red-300 cursor-not-allowed' : 'bg-green-200 hover:bg-green-300 cursor-pointer'
                    }`}
                    title={booked ? '予約済み' : `予約可能: ${room.name} at ${slot}`}
                    onClick={() => handleSlotClick(room.id, room.name, slot, booked)}
                  >
                    {/* Visual cue can be added here if needed */}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DayTimeline;
