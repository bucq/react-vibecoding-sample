// src/app/room/[id]/page.tsx
import React from 'react';

interface RoomDetailPageProps {
  params: {
    id: string;
  };
}

const RoomDetailPage: React.FC<RoomDetailPageProps> = ({ params }) => {
  return (
    <div>
      <h1>Meeting Room Details</h1>
      <p>Details for room ID: {params.id}</p>
      {/* More details will be added here in the future */}
    </div>
  );
};

export default RoomDetailPage;
