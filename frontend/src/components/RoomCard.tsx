import React from 'react';
import { DollarSign, Users } from 'lucide-react';
import { Room } from '../services/api';

interface RoomCardProps {
  room: Room;
  onSelect?: () => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      role={onSelect ? 'button' : undefined}
      className={`rounded-xl p-4 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all bg-white border border-gray-100 ${onSelect ? 'cursor-pointer' : ''}`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{room.name}</h3>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-primary-50 rounded-md">
            <DollarSign size={14} className="text-primary-600" />
          </span>
          <span>₹{room.baseHourlyRate}/hour</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-50 rounded-md">
            <Users size={14} className="text-accent-600" />
          </span>
          <span>Capacity: {room.capacity}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;