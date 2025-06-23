import { Alert } from 'antd';
import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function PageHeading({ title }) {
  return (
    <Alert
      type="info"
      style={{width: '100%', margin: '10px 0'}}
      message={
        <div className="flex w-full p-2 !items-center justify-between">
          <Link to={-1}>
            <spa className="font-semibold leading-0  text-xl flex items-center justify-start gap-2">
               <FaArrowLeftLong />{title}
            </spa>
          </Link>
        </div>
      }
    />
  );
}

export default PageHeading;
