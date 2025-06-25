import React from 'react';
import earningImage from '../../assets/icons/earning.svg';
import { FaDollarSign } from 'react-icons/fa6';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function EarningManage() {
  return (
    <div>
      <div className="relative w-full flex z-[999] overflow-hidden h-[250px] items-center justify-between bg-gradient-to-tr from-[#F6F6F6] via-white to-[var(--bg-green-low)]/70 p-12 rounded-xl">
        <div className="absolute top-0 -z-1 left-0 w-full h-full">
          <LazyLoadImage
            src={earningImage}
            alt="Lazy Loaded Image"
            effect="blur"
            width={600}
            height={400}
            className="w-full h-full object-contain object-right-bottom"
          />
        </div>
        <div className="flex flex-col items-start">
          <div className="bg-[#235FB7] rounded-md p-4 ">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM12 23C5.935 23 1 18.065 1 12C1 5.935 5.935 1 12 1C18.065 1 23 5.935 23 12C23 18.065 18.065 23 12 23ZM16 14.374C16 15.822 14.822 17 13.374 17H12.5V18.5C12.5 18.776 12.276 19 12 19C11.724 19 11.5 18.776 11.5 18.5V17H10.574C9.595 17 8.681 16.474 8.192 15.625C8.053 15.386 8.135 15.08 8.375 14.942C8.613 14.802 8.919 14.885 9.058 15.125C9.37 15.665 9.952 16 10.575 16H13.375C14.271 16 15.001 15.271 15.001 14.374C15.001 13.571 14.426 12.896 13.633 12.769L10.211 12.219C8.931 12.013 8.001 10.923 8.001 9.626C8.001 8.178 9.179 7 10.627 7H11.501V5.5C11.501 5.224 11.725 5 12.001 5C12.277 5 12.501 5.224 12.501 5.5V7H13.427C14.406 7 15.319 7.527 15.809 8.375C15.948 8.614 15.866 8.92 15.626 9.058C15.39 9.194 15.081 9.115 14.943 8.875C14.631 8.335 14.049 8 13.426 8H10.626C9.73 8 9 8.729 9 9.626C9 10.429 9.575 11.104 10.368 11.231L13.79 11.781C15.07 11.987 16 13.078 16 14.374Z"
                fill="white"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold !mt-6 leading-none">
            Total Earnings
          </h2>
          <h1 className="text-3xl leading-none">$23,0900</h1>
        </div>
      </div>
    </div>
  );
}

export default EarningManage;
