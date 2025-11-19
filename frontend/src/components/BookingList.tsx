import React from 'react';
import { Clock, XCircle } from 'lucide-react';
import { Booking } from '../services/api';

interface BookingListProps {
  bookings: Booking[];
  onCancel: (bookingId: string) => void;
}

export const BookingList: React.FC<BookingListProps> = ({ bookings, onCancel }) => {
  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  if (bookings.length === 0) {
    return <p className="text-center text-gray-500 py-8">No bookings yet</p>;
  }

  return (
    <div className="space-y-4">
      {bookings.map(booking => (
        <div key={booking.bookingId} className="border rounded-lg p-4 flex justify-between items-start bg-white">
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-800">{booking.userName}</h3>
            <p className="text-sm text-gray-600">Room: {booking.roomId}</p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Clock size={14} />
              {formatDateTime(booking.startTime)} - {formatDateTime(booking.endTime)}
            </p>
            <p className="text-sm font-medium text-green-600">₹{booking.totalPrice}</p>
            <span className={`inline-block px-2 py-1 text-xs rounded ${
              booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {booking.status}
            </span>
          </div>
          {booking.status === 'CONFIRMED' && (
            <button
              onClick={() => onCancel(booking.bookingId)}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <XCircle size={16} />
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
};