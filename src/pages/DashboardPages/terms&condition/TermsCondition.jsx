/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import PageHeading from '../../../Components/Shared/PageHeading.jsx';
// import {
//   useGetTermsAndConditionsQuery,
//   useUpdateTermsAndConditionsMutation,
// } from '../../../Redux/services/settings/termsAndConditionsApis.js';
import toast from 'react-hot-toast';
import JoditComponent from '../../../Components/Shared/JoditComponent.jsx';

const TermsCondition = () => {
  const [content, setContent] = useState('Terms & Condition');
  // const { data, isLoading } = useGetTermsAndConditionsQuery({});
  // const [setDescription, { isLoading: isSubmitting }] =
  //   useUpdateTermsAndConditionsMutation();
  // useEffect(() => {
  //   if (data?.data?.description) {
  //     setContent(data?.data?.description);
  //   }
  // }, [data]);

  // const updateTerms = async () => {
  //   try {
  //     const requestData = {
  //       description: content,
  //     };

  //     const res = await setDescription({ requestData }).unwrap();
  //     if (res?.success) {
  //       toast.success(
  //         res?.message || 'Terms and conditions updated successfully !'
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // if (isLoading) {
  //   return (
  //     <div>
  //       <div className="w-48 h-6 mb-3 rounded-md animate-pulse bg-gray-200"></div>
  //       <div className="w-full p-3 flex flex-col gap-2 min-h-[600px] animate-pulse rounded-md bg-gray-200">
  //         {Array.from({ length: 22 }).map((_, x) => (
  //           <div key={x} className="bg-gray-300 h-3 w-full animate-pulse"></div>
  //         ))}
  //       </div>
  //       <div className="w-32 h-8 mt-3 rounded-md animate-pulse bg-gray-200"></div>
  //     </div>
  //   );
  // }

  return (
    <>
      {/* heading and back button */}
      <PageHeading title="Terms & Condition" />
      <JoditComponent setContent={setContent} content={content} />

      {/* Button to log content */}
      <Button
        // onClick={updateTerms}
        // disabled={isSubmitting}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
          backgroundColor: 'var(--bg-green-high)',
          color: '#fff',
          height: 40,
        }}
        className="max-w-48 sidebar-button-black"
      >
        {/* {isSubmitting ? 'Submitting...' : 'Submit'} */}
        Submit
      </Button>
    </>
  );
};

export default TermsCondition;
