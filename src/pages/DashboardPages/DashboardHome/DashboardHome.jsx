import { Card, Divider } from 'antd';
import React from 'react';
import user from '../../../assets/icons/man.png';
import blockUser from '../../../assets/icons/block-user.png';
import GrowthChart from '../../../Components/charts/UserGrowthChart';
import ActivityChart from '../../../Components/charts/ActivityChart';
import RecentlyJoinedUsers from '../../../Components/tables/User/RecentlyJoinedUsers';
import { useGetTotalOverviewQuery } from '../../../Redux/services/dashboard apis/total-overview/totalOverviewApis';
import Loader from '../../../Components/Shared/Loaders/Loader';
import PageHeading from '../../../Components/Shared/PageHeading';
import EearningsChart from '../../../Components/charts/EearningsChart';
function DashboardHome() {
  const { data, isLoading } = useGetTotalOverviewQuery();
  const cardData = [
    {
      title: 'Total User',
      value: isLoading ? <Loader /> : Number(data?.data?.totalDriver) || 0,
      icon: (
        <div className="!w-24 !h-24 overflow-hidden">
          <img
            className="w-full h-full object-contain"
            src={user}
            alt="user_icons"
          />
        </div>
      ),
    },
    {
      title: 'Total Admin',
      value: isLoading ? <Loader /> : Number(data?.data?.totalUser) || 0,
      icon: (
        <div className="w-24 h-24 overflow-hidden">
          <img
            className="w-full h-full object-contain"
            src={blockUser}
            alt="user_icons"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex mb-4 items-center justify-between bg-white shadow-sm pr-12 rounded-md w-full">
        <PageHeading title="Dashboard" />
      </div>
      <div className="grid grid-cols-2 bg-gradient-to-tr from-[#F6F6F6] via-white to-[var(--bg-green-low)]/70 p-12 rounded-xl">
        {cardData.map((card, index) => (
          <div className="" key={index}>
            <div
              className={`flex ${
                index !== 1 ? 'border-r-2' : ''
              } px-12 items-center justify-center gap-3`}
            >
              <div className="w-28 h-28  flex items-center justify-center">
                {card.icon}
              </div>
              <div className="flex items-start flex-col justify-center ">
                <h1 className="text-3xl !font-semibold leadingflex items-center justify-center -4">
                  {card.title}
                </h1>
                <h1 className="text-3xl !font-semibold leading-4 text-[var(--bg-green-high)]">
                  {card.value}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4  gap-4 mt-4 xl:h-[450px]">
        <div className="w-full col-span-4 xl:col-span-2 h-full">
          <GrowthChart />
        </div>
        <div className="w-full col-span-4 xl:col-span-2 h-full">
          <EearningsChart />
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
