// src/app/my-reservations/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import ReservationListItem from '../components/ReservationListItem';
import { meetingRooms } from '../data/meetingRooms'; // For enriching with room names

export interface UserReservation {
  id: string;
  roomId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  title?: string; // Added title
  roomName?: string;
}

const MOCK_USER_ID = 'user123'; // Simulate a logged-in user

const MyReservationsPage = () => {
  const [userReservations, setUserReservations] = useState<UserReservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserReservations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/reservations');
      if (!response.ok) {
        throw new Error(`Failed to fetch reservations: ${response.statusText}`);
      }
      let data: UserReservation[] = await response.json();
      // Filter by MOCK_USER_ID and enrich with room names
      const enrichedData = data
        .filter(res => res.userId === MOCK_USER_ID)
        .map(res => {
          const room = meetingRooms.find(r => r.id === res.roomId);
          return { ...res, roomName: room ? room.name : 'Unknown Room' };
        });
      setUserReservations(enrichedData);
    } catch (err: any) {
      setError(err.message);
      setUserReservations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserReservations();
  }, [fetchUserReservations]);

  const handleCancelReservation = async (reservationId: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;

    try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to cancel reservation: ${response.statusText}`);
      }
      // alert('Reservation cancelled successfully!'); // Or some other notification
      // Refresh the list from server or filter locally
      setUserReservations(prevReservations =>
        prevReservations.filter(res => res.id !== reservationId)
      );
    } catch (err: any) {
      setError(err.message);
      alert(`Error cancelling reservation: ${err.message}`);
    }
  };

  if (isLoading) return <p className="p-6 text-center text-gray-600 text-lg">Loading your reservations...</p>;
  if (error) return <p className="p-6 text-center text-red-700 bg-red-100 rounded-lg text-lg">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">My Reservations</h1>
      {userReservations.length === 0 && !isLoading && (
        <p className="text-gray-600 text-lg text-center py-8">You have no active reservations.</p> // Centered and padded
      )}
      <div className="space-y-6"> {/* Increased spacing */}
        {userReservations
          .sort((a,b) => new Date(a.date + 'T' + a.startTime).getTime() - new Date(b.date + 'T' + b.startTime).getTime())
          .map(reservation => (
          <ReservationListItem
            key={reservation.id}
            reservation={reservation}
            onCancel={handleCancelReservation}
          />
        ))}
      </div>
    </div>
  );
};

export default MyReservationsPage;
