/**
 * @jest-environment node
 */
import { GET } from '../route'; // Adjust path to your route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';

// Mock the fs module
jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

// Mock path.join to ensure it works in test environment
jest.mock('path', () => {
  const actualPath = jest.requireActual('path'); // Preserve other path functions
  return {
    ...actualPath,
    join: (...paths: string[]) => {
      // Simple join for testing, might need to be more robust
      // depending on how process.cwd() behaves in test runner
      if (paths.length > 0 && paths[0] === process.cwd()) {
        // This mock assumes process.cwd() is the project root.
        // It then constructs a path relative to a 'mock_base_path'
        // to simulate the structure 'src/app/data/reservations.json'.
        return `mock_base_path/${paths.slice(1).join(actualPath.sep)}`;
      }
      return actualPath.join(...paths);
    },
  };
});

// This should match the path constructed by the mocked path.join
const mockReservationsFilePath = 'mock_base_path/src/app/data/reservations.json';

describe('GET /api/reservations', () => {
  beforeEach(() => {
    mockedFs.readFileSync.mockReset();
    // Ensure that console.error is spied on before each test and restored after
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original console.error after each test
    (console.error as jest.Mock).mockRestore();
  });

  it('should return an empty array if reservations.json is empty', async () => {
    mockedFs.readFileSync.mockReturnValueOnce(JSON.stringify([]));

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual([]);
    expect(mockedFs.readFileSync).toHaveBeenCalledWith(mockReservationsFilePath, 'utf-8');
  });

  it('should return reservations if reservations.json has data', async () => {
    const mockData = [{ id: '1', name: 'Test Reservation' }];
    mockedFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockData));

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(mockData);
    expect(mockedFs.readFileSync).toHaveBeenCalledWith(mockReservationsFilePath, 'utf-8');
  });

  it('should return an empty array and log error if reservations.json is malformed', async () => {
    mockedFs.readFileSync.mockReturnValueOnce('this is not json');

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it('should return empty array and log error if readFileSync throws an error (e.g. general error other than ENOENT)', async () => {
    mockedFs.readFileSync.mockImplementation(() => {
      // Simulate a generic error
      const error = new Error('File system error');
      // (error as any).code = 'EACCES'; // Example of a different error code
      throw error;
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200); // The handler catches errors and returns []
    expect(body).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it('should return empty array if reservations.json does not exist (ENOENT)', async () => {
    mockedFs.readFileSync.mockImplementation(() => {
      const error = new Error("File not found");
      (error as NodeJS.ErrnoException).code = "ENOENT";
      throw error;
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual([]);
    expect(console.error).toHaveBeenCalled(); // The route logs an error when file not found
  });
});
