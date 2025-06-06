import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center mt-10"> {/* Added margin-top for better spacing below navbar */}
      <h1 className="text-3xl font-bold mb-6">Welcome to the Meeting Room Booking System!</h1>
      <p className="mb-8 text-lg">
        Manage and book your meeting rooms efficiently.
      </p>
      <div className="space-y-4 md:space-y-0 md:space-x-4"> {/* Responsive spacing for buttons */}
        <Link href="/office" className="inline-block w-full md:w-auto bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg mb-2 md:mb-0">
          View Office Layout
        </Link>
        <Link href="/timeline" className="inline-block w-full md:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg mb-2 md:mb-0">
          Book a Room (Timeline)
        </Link>
        <Link href="/my-reservations" className="inline-block w-full md:w-auto bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg">
          My Reservations
        </Link>
      </div>
    </div>
  );
}
