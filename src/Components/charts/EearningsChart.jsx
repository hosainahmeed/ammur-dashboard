import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Select, MenuItem } from '@mui/material'; // Import MenuItem from @mui/material

// Example datasets for two years (2025 and 2026)
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

const data2026 = [
  { uv: 4500, pv: 2500, amt: 2500, name: 'January' },
  { uv: 4600, pv: 2600, amt: 2600, name: 'February' },
  { uv: 4700, pv: 2700, amt: 2700, name: 'March' },
  { uv: 4800, pv: 2800, amt: 2800, name: 'April' },
  { uv: 4900, pv: 2900, amt: 2900, name: 'May' },
  { uv: 5000, pv: 3000, amt: 3000, name: 'June' },
  { uv: 5100, pv: 3100, amt: 3100, name: 'July' },
  { uv: 5200, pv: 3200, amt: 3200, name: 'August' },
  { uv: 5300, pv: 3300, amt: 3300, name: 'September' },
  { uv: 5400, pv: 3400, amt: 3400, name: 'October' },
  { uv: 5500, pv: 3500, amt: 3500, name: 'November' },
  { uv: 5600, pv: 3600, amt: 3600, name: 'December' },
];

function EearningsChart() {
  const [year, setYear] = useState(2025); // default to 2025
  const [chartData, setChartData] = useState(data2025); // default chart data

  // Update chart data when year changes
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    if (selectedYear === 2025) {
      setChartData(data2025);
    } else if (selectedYear === 2026) {
      setChartData(data2026);
    }
  };

  return (
    <div className="w-full h-full bg-white p-4 rounded-xl shadow-xl">
      {/* Year Selector */}
      <div className="mb-4">
        <Select value={year} onChange={handleYearChange} fullWidth>
          <MenuItem value={2025}>2025</MenuItem>
          <MenuItem value={2026}>2026</MenuItem>
          {/* You can add more years as needed */}
        </Select>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={chartData}
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
