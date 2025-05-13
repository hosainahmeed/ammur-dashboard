import React from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import Loader from '../Shared/Loaders/Loader';

const ActivityStatisticsChart = () => {
  const activity = {
    onlineDriver: 12,
    onlineUser: 45,
  };
  const datas = [
    { name: ' Active User', value: activity?.onlineUser },
    { name: 'Active Agent', value: activity?.onlineDriver },
  ];

  const totalValue = datas.reduce((sum, item) => sum + item.value, 0);

  const COLORS = ['#166534', '#059669'];

  return (
    <div className="bg-gradient-to-tr from-[#F6F6F6] via-white to-[var(--bg-green-low)]/70 rounded-xl p-6 w-full h-[450px]">
      <h1 className="!text-sm xl:!text-2xl font-bold text-purple-950 mb-6">
        Activity Statistics
      </h1>

      <div className="relative h-64 flex justify-center">
        {/* PieChart Component */}
        <PieChart width={240} height={240}>
          <Pie
            data={datas}
            cx={120}
            cy={120}
            startAngle={90}
            endAngle={-270}
            innerRadius={60}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
          >
            {datas.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                strokeWidth={0}
              />
            ))}
          </Pie>
        </PieChart>

        {/* Center Total Value */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-xl xl:text-3xl font-bold text-gray-800">
            {activity ? (
              totalValue >= 1000 ? (
                (totalValue / 1000).toFixed(1) + 'K'
              ) : (
                totalValue
              )
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="mt-6 space-y-4">
        {datas.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-xl text-gray-800">{entry.name}</span>
            </div>
            <div
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
              className="min-w-[100px] flex items-center justify-center rounded-lg px-4 py-1 text-xl text-white"
            >
              {entry.value || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStatisticsChart;
