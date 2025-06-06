// src/app/api/reservations/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to the JSON data file
const reservationsFilePath = path.join(process.cwd(), 'src', 'app', 'data', 'reservations.json');

// Helper function to read reservations
const readReservations = () => {
  try {
    const jsonData = fs.readFileSync(reservationsFilePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading reservations file:', error);
    // If file doesn't exist or is invalid, return empty array or handle error
    return [];
  }
};

// Helper function to write reservations
const writeReservations = (data: any) => {
  try {
    fs.writeFileSync(reservationsFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing reservations file:', error);
  }
};

// GET handler to fetch all reservations
export async function GET() {
  const reservations = readReservations();
  return NextResponse.json(reservations);
}

// POST handler to create a new reservation
export async function POST(request: Request) {
  try {
    const newReservation = await request.json();

    // Basic validation
    if (!newReservation.roomId || !newReservation.userId || !newReservation.date || !newReservation.startTime || !newReservation.endTime || !newReservation.title) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const reservations = readReservations();

    // Generate a unique ID (simple example)
    newReservation.id = `res-${new Date().getTime()}-${Math.random().toString(36).substr(2, 5)}`;

    reservations.push(newReservation);
    writeReservations(reservations);

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json({ message: 'Error creating reservation' }, { status: 500 });
  }
}
