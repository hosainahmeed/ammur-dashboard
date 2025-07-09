import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import PageHeading from '../../../Components/Shared/PageHeading.jsx';
import JoditComponent from '../../../Components/Shared/JoditComponent.jsx';
import {
  useGetAboutQuery,
  useUpdateAboutMutation,
} from '../../../Redux/services/settings/aboutApis.js';
import toast from 'react-hot-toast';

const AboutUs = () => {
  const [content, setContent] = useState('About Us');
  const { data, isLoading } = useGetAboutQuery({});
  const [setDescription, { isLoading: isSubmitting }] =
    useUpdateAboutMutation();

  useEffect(() => {
    if (data?.data?.description) {
      setContent(data?.data?.description);
    }
  }, [data]);

  const handleLogContent = async () => {
    try {
      await setDescription({ description: content })
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res?.success) {
            toast.success(res?.message || 'About us updated successfully !');
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="w-48 h-6 mb-3 rounded-md animate-pulse bg-gray-200"></div>
        <div className="w-full p-3 flex flex-col gap-2 min-h-[600px] animate-pulse rounded-md bg-gray-200">
          {Array.from({ length: 22 }).map((_, x) => (
            <div key={x} className="bg-gray-300 h-3 w-full animate-pulse"></div>
          ))}
        </div>
        <div className="w-32 h-8 mt-3 rounded-md animate-pulse bg-gray-200"></div>
      </div>
    );
  }

  return (
    <>
      {/* heading and back button */}
      <PageHeading title="About us" />
      <JoditComponent setContent={setContent} content={content} />

      {/* Button to log content */}
      <Button
        onClick={handleLogContent}
        disabled={isSubmitting}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
          backgroundColor: 'var(--bg-green-high)',
          color: '#fff',
          height: 40,
        }}
        className="max-w-48 sidebar-button-black"
        loading={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </>
  );
};

export default AboutUs;
