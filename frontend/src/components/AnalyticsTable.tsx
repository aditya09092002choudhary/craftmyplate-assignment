import React from 'react';
import { AnalyticsResult } from '../services/api';

interface Props {
  data: AnalyticsResult[];
}

const AnalyticsTable: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return <div className="muted">No analytics data</div>;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Room</th>
            <th style={{ textAlign: 'right' }}>Total Hours</th>
            <th style={{ textAlign: 'right' }}>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.roomName}</td>
              <td style={{ textAlign: 'right' }}>{row.totalHours.toFixed(1)}h</td>
              <td style={{ textAlign: 'right' }}>₹{row.totalRevenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsTable;
