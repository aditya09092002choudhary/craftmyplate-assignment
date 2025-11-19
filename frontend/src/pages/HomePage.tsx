import React, { useState } from 'react';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import BookingForm from '../components/BookingForm';
import { BookingList } from '../components/BookingList';
import { Analytics } from '../components/Analytics';
import { useRooms } from '../hooks/useRooms';
import { useBookings } from '../hooks/useBookings';
import { api } from '../services/api';

type Tab = 'rooms' | 'book' | 'bookings' | 'analytics';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('rooms');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const { rooms, loading: roomsLoading } = useRooms();
  const { bookings, loading: bookingsLoading, createBooking, cancelBooking } = useBookings();

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleCreateBooking = async (data: any) => {
    try {
      const booking = await createBooking({
        ...data,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString()
      });
      showMessage('success', `Booking confirmed! Total: ₹${booking.totalPrice}`);
      setActiveTab('bookings');
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Failed to create booking');
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      showMessage('success', 'Booking cancelled successfully');
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Failed to cancel booking');
    }
  };

  const handleFetchAnalytics = async (from: string, to: string) => {
    try {
      const data = await api.getAnalytics(from, to);
      showMessage('success', 'Analytics loaded successfully');
      return data;
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Failed to fetch analytics');
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Calendar className="text-indigo-600" size={32} />
            Workspace Booking System
          </h1>
          <p className="text-gray-600 mt-2">Book meeting rooms with dynamic pricing</p>
        </div>

        {/* Message Banner */}
        {message && (
          <div className={`rounded-lg p-4 mb-6 flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            {(['rooms', 'book', 'bookings', 'analytics'] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'rooms' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roomsLoading ? (
                  <p>Loading rooms...</p>
                ) : (
                  rooms.map(room => <RoomCard key={room.id} room={room} />)
                )}
              </div>
            )}

            {activeTab === 'book' && (
              <BookingForm rooms={rooms} onSubmit={handleCreateBooking} />
            )}

            {activeTab === 'bookings' && (
              bookingsLoading ? (
                <p>Loading bookings...</p>
              ) : (
                <BookingList bookings={bookings} onCancel={handleCancelBooking} />
              )
            )}

            {activeTab === 'analytics' && (
              <Analytics onFetch={handleFetchAnalytics} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};