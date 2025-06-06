// src/app/timeline/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import DayTimeline from '../components/DayTimeline';
import { MeetingRoom, meetingRooms } from '../data/meetingRooms'; // Using static for room list display
import { UserReservation } from '../my-reservations/page'; // Assuming this type can be reused or adapted

const TimelinePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reservations, setReservations] = useState<UserReservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = useCallback(async (date: Date) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/reservations');
      if (!response.ok) {
        throw new Error(`Failed to fetch reservations: ${response.statusText}`);
      }
      const data: UserReservation[] = await response.json();
      // Filter by date on client-side until API supports date query param
      const dateString = date.toISOString().split('T')[0];
      setReservations(data.filter(res => res.date === dateString));
    } catch (err: any) {
      setError(err.message);
      setReservations([]); // Clear reservations on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations(currentDate);
  }, [currentDate, fetchReservations]);

  const handlePrevDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
  };

  // Placeholder for actual booking logic that would use POST
  const handleBookSlot = async (roomId: string, startTime: string, date: Date) => {
    console.log(`Attempting to book room ${roomId} at ${startTime} on ${date.toISOString().split('T')[0]}`);
    // This would involve a POST request to /api/reservations
    // For now, just re-fetch to simulate potential update if we had a POST here
    // await fetchReservations(currentDate);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Timeline Reservation</h1>
      <div className="flex justify-between items-center mb-6"> {/* Increased mb */}
        <button onClick={handlePrevDay} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow hover:shadow-md transition-all duration-150">
          Previous Day
        </button>
        <h2 className="text-xl font-semibold text-gray-700">{currentDate.toLocaleDateString()}</h2>
        <button onClick={handleNextDay} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow hover:shadow-md transition-all duration-150">
          Next Day
        </button>
      </div>
      {isLoading && <p className="p-6 text-center text-gray-600 text-lg">Loading reservations...</p>}
      {error && <p className="p-6 text-center text-red-700 bg-red-100 rounded-lg text-lg">Error: {error}</p>}
      {!isLoading && !error && (
        <DayTimeline
          date={currentDate}
          rooms={meetingRooms} // Static room list for display
          reservations={reservations} // Fetched and filtered reservations
          // onBookSlot={handleBookSlot} // Pass booking handler
        />
      )}
    </div>
  );
};

export default TimelinePage;
