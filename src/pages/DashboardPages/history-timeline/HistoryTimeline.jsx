import React from 'react';
import { Card } from 'antd';
import PageHeading from '../../../Components/Shared/PageHeading';
import HistoryTable from '../../../Components/tables/hisory-timeline-table/HistoryTable';

function HistoryTimeline() {
  return (
    <div>
      <PageHeading title="History Timeline" />
      <HistoryTable />
    </div>
  );
}

export default HistoryTimeline;
