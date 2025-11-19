import React, { useState } from 'react';
import { AnalyticsResult } from '../services/api';

interface AnalyticsProps {
  onFetch: (from: string, to: string) => Promise<AnalyticsResult[]>;
}

export const Analytics: React.FC<AnalyticsProps> = ({ onFetch }) => {
  const [data, setData] = useState<AnalyticsResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });

  const handleFetch = async () => {
    try {
      setLoading(true);
      const result = await onFetch(dateRange.from, dateRange.to);
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <input
            type="date"
            value={dateRange.from}
            onChange={e => setDateRange({ ...dateRange, from: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <input
            type="date"
            value={dateRange.to}
            onChange={e => setDateRange({ ...dateRange, to: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleFetch}
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Load Analytics'}
        </button>
      </div>

      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Room</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Total Hours</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">{item.roomName}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 text-right">{item.totalHours.toFixed(1)}h</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600 text-right">₹{item.totalRevenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
