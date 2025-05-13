import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function PageHeading({ title }) {
  return (
    <div className="flex !mt-3 !items-center p-3 justify-between">
      <Link to={-1}>
        <h1 className="font-semibold leading-0  text-xl flex items-center justify-start gap-2">
          <FaArrowLeftLong /> {title}
        </h1>
      </Link>
    </div>
  );
}

export default PageHeading;
