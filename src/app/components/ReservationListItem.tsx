// src/app/components/ReservationListItem.tsx
import React from 'react';
import { UserReservation } from '../my-reservations/page'; // Adjust path to import UserReservation type

interface Props {
  reservation: UserReservation;
  onCancel: (reservationId: string) => void;
}

const ReservationListItem: React.FC<Props> = ({ reservation, onCancel }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-200 ease-in-out">
      <h3 className="text-xl font-bold text-indigo-600 mb-1">{reservation.roomName || 'Meeting Room'}</h3>
      <p className="text-gray-700 mb-0.5"> {/* Adjusted text-gray-700 from text-gray-600 for details */}
        <strong>Date:</strong> {new Date(reservation.date + 'T00:00:00').toLocaleDateString()} {/* Ensure date is parsed correctly if only date string */}
      </p>
      <p className="text-gray-700 mb-0.5">
        <strong>Time:</strong> {reservation.startTime} - {reservation.endTime}
      </p>
      {reservation.title && <p className="text-gray-700 mb-2"><strong>Title:</strong> {reservation.title}</p>}
      <p className="text-gray-500 text-sm mb-3"> {/* Added mb-3 */}
        Reservation ID: {reservation.id}
      </p>
      <button
        onClick={() => onCancel(reservation.id)}
        className="bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-150"
      >
        Cancel Reservation
      </button>
    </div>
  );
};

export default ReservationListItem;
