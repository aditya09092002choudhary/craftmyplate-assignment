import React, { useState } from 'react';
import { Room } from '../services/api';

interface BookingFormProps {
  rooms: Room[];
  onSubmit: (data: {
    roomId: string;
    userName: string;
    startTime: string;
    endTime: string;
  }) => void;
  loading?: boolean;
  prefillRoomId?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ rooms, onSubmit, loading, prefillRoomId }) => {
  const [formData, setFormData] = useState({
    roomId: prefillRoomId || '',
    userName: '',
    startTime: '',
    endTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
        <select
          value={formData.roomId}
          onChange={e => setFormData({ ...formData, roomId: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
          required
        >
          <option value="">Select a room</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>
              {room.name} - ₹{room.baseHourlyRate}/hr
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          value={formData.userName}
          onChange={e => setFormData({ ...formData, userName: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
        <input
          type="datetime-local"
          value={formData.startTime}
          onChange={e => setFormData({ ...formData, startTime: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
        <input
          type="datetime-local"
          value={formData.endTime}
          onChange={e => setFormData({ ...formData, endTime: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>

      <div className="bg-primary-50 p-3 rounded-md">
        <p className="text-sm text-primary-800">
          <strong>Peak Hours:</strong> Mon–Fri 10:00–13:00 & 16:00–19:00 (1.5× rate)
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3 rounded-lg font-medium hover:from-primary-700 hover:to-primary-600 transition-colors disabled:opacity-60"
      >
        {loading ? 'Creating...' : 'Create Booking'}
      </button>
    </div>
  );
};

export default BookingForm;