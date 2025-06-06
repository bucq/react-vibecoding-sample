// src/app/components/__tests__/ReservationListItem.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReservationListItem from '../ReservationListItem';
import { UserReservation } from '../../my-reservations/page'; // Adjust path as necessary

describe('ReservationListItem', () => {
  const mockReservation: UserReservation = {
    id: 'res123',
    roomId: 'room1',
    roomName: 'Conference Room Alpha',
    userId: 'userTest',
    date: '2024-03-15',
    startTime: '10:00',
    endTime: '11:00',
    title: 'Test Meeting',
  };

  const mockOnCancel = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockOnCancel.mockClear();
    render(<ReservationListItem reservation={mockReservation} onCancel={mockOnCancel} />);
  });

  it('renders reservation details correctly', () => {
    expect(screen.getByText(mockReservation.roomName!)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockReservation.startTime))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockReservation.endTime))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockReservation.title!))).toBeInTheDocument(); // Check for title
    // For date, it's better to check for parts of the formatted date,
    // as toLocaleDateString() can vary by environment.
    // Example: Check if 'March' '15' and '2024' are present if that's the expected format.
    // Or, more robustly, parse the date text content and compare Date objects.
    // For this example, we'll assume a specific common format part.
    expect(screen.getByText(/3\/15\/2024/i)).toBeInTheDocument(); // Common US format M/D/YYYY
  });

  it('calls onCancel with reservation id when cancel button is clicked', () => {
    const cancelButton = screen.getByRole('button', { name: /cancel reservation/i });
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalledWith(mockReservation.id);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('displays the room name, date, time, and title', () => {
    expect(screen.getByText('Conference Room Alpha')).toBeInTheDocument();
    // Check for text that includes "Date:"
    expect(screen.getByText((content, element) => content.startsWith('Date:') && content.includes('3/15/2024'))).toBeInTheDocument();
    expect(screen.getByText(/10:00 - 11:00/)).toBeInTheDocument();
    expect(screen.getByText('Test Meeting')).toBeInTheDocument();
  });
});
