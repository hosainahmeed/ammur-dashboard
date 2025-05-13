import React from 'react';
import BookingChart from '../../../Components/charts/BookingChart';
import PageHeading from '../../../Components/Shared/PageHeading';
import TransactionTable from '../../../Components/tables/transactionTable/TransactionTable.jsx';
import EarningManage from '../../../Components/Earning/EarningManage';

function EarningPage() {
  return (
    <div>
      <PageHeading title={'Earnings'} />
      <div className="grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div className="col-span-2">
          <EarningManage />
        </div>
        <div className="col-span-3">
          <BookingChart />
        </div>
      </div>
      <div className='mt-12'>
        <h1>Last Transections history</h1>
        <TransactionTable />
      </div>
    </div>
  );
}

export default EarningPage;
