import React from 'react';
import { useState } from 'react';
import { Button } from 'antd';
import { FaCameraRetro } from 'react-icons/fa6';
import ProfileEdit from '../../../Components/ProfilePage/ProfileEdit.jsx';
import ChangePassword from '../../../Components/ProfilePage/ChangePassword.jsx';
// import { useGetProfileDataQuery } from '../../../Redux/services/profileApis.js';
// import { imageUrl } from '../../../Utils/server.js';

const Tabs = ['Edit Profile', 'Change Password'];

const Profile = () => {
  const [tab, setTab] = useState(Tabs[0]);
  // const { data: profileData, isLoading } = useGetProfileDataQuery({});
  const [image, setImage] = useState(null);
  const handleImageUpload = (e) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
      localStorage.setItem('image', e.target.files[0]);
    }
  };
  // const profileImage = image
  //   ? URL.createObjectURL(image)
  //   : profileData?.data?.profile_image
  //   ? imageUrl(profileData.data.profile_image)
  //   : 'https://placehold.co/400';

  return (
    <>
      <div className="max-w-[700px] mx-auto  p-4 rounded-md">
        <div className="w-full center-center">
          <div
            onClick={() => {
              if (tab === 'Edit Profile') {
                document.getElementById('fileInput').click();
              }
            }}
            className="w-24 h-24 border-2 border-black p-1 cursor-pointer rounded-full relative"
          >
            <img
              className="w-full h-full object-cover rounded-full"
              src={
                'https://wallpapercat.com/w/full/b/9/2/2144467-1920x1080-desktop-full-hd-hinata-naruto-wallpaper.jpg'
              }
              // src={profileImage}
              alt="Profile"
            />
            {tab === 'Edit Profile' && (
              <button
                aria-label="Edit Profile Picture"
                className="absolute right-0 bottom-2 rounded-full bg-[var(--bg-green-high)]  p-2"
              >
                <FaCameraRetro size={12} className="text-white cursor-pointer" />
              </button>
            )}

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <p className="text-2xl text-center text-black mt-2">
          {/* {profileData?.data?.name || 'User Name'} */}
          Hinata
        </p>
      </div>

      {/* Tabs Section */}
      <div className="mx-auto p-1 border rounded-sm !w-fit center-center my-3">
        {Tabs.map((item) => (
          <Button
            key={item}
            style={{ width: '200px', justifyContent: 'center' }}
            className={`${
              item === tab
                ? '!bg-[var(--bg-green-high)] !text-white !border-0 !rounded-sm'
                : '!border-0 !rounded-none !text-black !border-black !bg-transparent'
            }`}
            onClick={() => setTab(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="max-w-[700px] mx-auto bg-[var(--black-200)] p-4 rounded-md">
        {tab === 'Edit Profile' ? (
          // isLoading ? (
          //   <span className="loader-black"></span>
          // ) : (
          //   <ProfileEdit
          //     image={image}
          //     defaultImage={profileImage}
          //     data={profileData?.data}
          //   />
          // )
          <ProfileEdit
            image={image}
            // defaultImage={profileImage}
            // data={profileData?.data}
          />
        ) : (
          <ChangePassword />
        )}
      </div>
    </>
  );
};

export default Profile;
