import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import React, { memo, useMemo } from 'react';
import Loader from '../Shared/Loaders/Loader';
import { useGetTotalOverviewQuery } from '../../Redux/services/dashboard apis/totalOverviewApis';

const monthOrder = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const monthNameToShort = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};

const UserGrowthChart = () => {
  const { data, isLoading } = useGetTotalOverviewQuery();

  const { monthlyData, maxUsers } = useMemo(() => {
    const rawData = data?.data || [];

    const monthMap = {};

    // Initialize all months with 0
    monthOrder.forEach((month) => {
      monthMap[month] = 0;
    });

    // Fill actual data
    rawData.forEach(({ month, count }) => {
      const shortMonth = monthNameToShort[month];
      if (shortMonth) {
        monthMap[shortMonth] = count;
      }
    });

    const maxUsers = Math.max(...Object.values(monthMap), 0) + 4;

    return {
      monthlyData: monthOrder.map((month) => ({
        name: month,
        totalUser: monthMap[month],
      })),
      maxUsers,
    };
  }, [data]);

  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <h3
            style={{
              textAlign: 'left',
              marginBottom: '15px',
              color: '#333',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            📈 User Growth Chart
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart
              data={monthlyData}
              margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0C469D" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#0C469D" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis
                dataKey="name"
                stroke="#333"
                tick={{ fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                stroke="#333"
                domain={[0, maxUsers]}
                tick={{ fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '8px',
                }}
                cursor={{ fill: 'rgb(2,44,34,0.1)' }}
              />
              <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 'bold' }} />
              <Bar
                dataKey="totalUser"
                fill="url(#colorUv)"
                barSize={100}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default memo(UserGrowthChart);
