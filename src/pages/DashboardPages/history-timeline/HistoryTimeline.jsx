import React from 'react';
import { Card } from 'antd';
import PageHeading from '../../../Components/Shared/PageHeading';
import HistoryTable from '../../../Components/tables/hisory-timeline-table/HistoryTable';

function HistoryTimeline() {
  return (
    <div>
      <div className="flex mb-4 items-center justify-between bg-white shadow-sm pr-12 rounded-md w-full">
        <PageHeading title="History Timeline" />
      </div>
      <HistoryTable />
    </div>
  );
}

export default HistoryTimeline;
