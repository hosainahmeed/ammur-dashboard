import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data2025 = [
  { uv: 4000, pv: 2400, amt: 2400, name: 'January' },
  { uv: 4200, pv: 2500, amt: 2500, name: 'February' },
  { uv: 4300, pv: 2600, amt: 2600, name: 'March' },
  { uv: 4400, pv: 2700, amt: 2700, name: 'April' },
  { uv: 4500, pv: 2800, amt: 2800, name: 'May' },
  { uv: 4600, pv: 2900, amt: 2900, name: 'June' },
  { uv: 4700, pv: 3000, amt: 3000, name: 'July' },
  { uv: 4800, pv: 3100, amt: 3100, name: 'August' },
  { uv: 4900, pv: 3200, amt: 3200, name: 'September' },
  { uv: 5000, pv: 3300, amt: 3300, name: 'October' },
  { uv: 5100, pv: 3400, amt: 3400, name: 'November' },
  { uv: 5200, pv: 3500, amt: 3500, name: 'December' },
];

function EearningsChart() {
  return (
    <div className="w-full h-full bg-white p-4 rounded-xl shadow-xl">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data2025}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#0C469D" fill="#0C469D" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EearningsChart;
