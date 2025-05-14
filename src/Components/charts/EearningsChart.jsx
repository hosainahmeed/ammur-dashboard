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
  { uv: 4100, pv: 2750, amt: 2350, name: 'Jan' },
  { uv: 4200, pv: 2400, amt: 2450, name: 'Feb' },
  { uv: 4300, pv: 2650, amt: 2550, name: 'Mar' },
  { uv: 4400, pv: 1200, amt: 2700, name: 'Apr' },
  { uv: 4600, pv: 2800, amt: 2800, name: 'May' },
  { uv: 4600, pv: 2900, amt: 2900, name: 'Jun' },
  { uv: 4750, pv: 3350, amt: 3100, name: 'Jul' },
  { uv: 4850, pv: 3100, amt: 3200, name: 'Aug' },
  { uv: 4950, pv: 3150, amt: 3250, name: 'Sep' },
  { uv: 5000, pv: 3300, amt: 3300, name: 'Oct' },
  { uv: 5100, pv: 3450, amt: 3400, name: 'Nov' },
  { uv: 5200, pv: 3500, amt: 3500, name: 'Dec' },
];

function EearningsChart() {
  return (
    <div className="w-full h-[450px] max-h-[450px] bg-white p-4 rounded-xl shadow-xl">
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
          <Area type="monotone" dataKey="amt" stroke="#0C469D" fill="#0C469D" />
          {/* <Area type="monotone" dataKey="pv" stroke="#ffa337" fill="#ffa337" /> */}
          {/* <Area type="monotone" dataKey="amt" stroke="#ffa337" fill="pink" /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EearningsChart;
