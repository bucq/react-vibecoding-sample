// src/app/api/reservations/[id]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const reservationsFilePath = path.join(process.cwd(), 'src', 'app', 'data', 'reservations.json');

const readReservations = (): any[] => {
  try {
    const jsonData = fs.readFileSync(reservationsFilePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    // If file doesn't exist, is empty, or is invalid JSON, return empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT' || error instanceof SyntaxError) {
        console.warn(`Reservations file not found or invalid at ${reservationsFilePath}. Returning empty array.`);
        return [];
    }
    console.error('Error reading reservations file:', error);
    // For other errors, rethrow or return empty array based on desired strictness
    // For now, returning empty to prevent crashes if file is somehow corrupted mid-operation
    return [];
  }
};

const writeReservations = (data: any) => {
  try {
    fs.writeFileSync(reservationsFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing reservations file:', error);
    // Consider how to handle write errors, e.g., throw to make API fail explicitly
  }
};

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reservationId = params.id;
    if (!reservationId) {
      return NextResponse.json({ message: 'Reservation ID is required' }, { status: 400 });
    }

    let reservations = readReservations();
    const initialLength = reservations.length;
    // Ensure correct type for comparison if IDs are numbers or strings
    reservations = reservations.filter((res: { id: string }) => res.id !== reservationId);

    if (reservations.length === initialLength) {
      return NextResponse.json({ message: 'Reservation not found' }, { status: 404 });
    }

    writeReservations(reservations);
    return NextResponse.json({ message: 'Reservation cancelled successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    // Ensure a response is always sent, even for unexpected errors
    return NextResponse.json({ message: 'Error deleting reservation' , error: (error as Error).message }, { status: 500 });
  }
}
