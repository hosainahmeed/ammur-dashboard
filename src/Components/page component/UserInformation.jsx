import React, { useState } from 'react';

export default function UserInformation() {
  const [profileData] = useState({
    name: 'Dindiniya',
    email: 'mahmud@gmail.com',
    contactNo: '+919355574544',
    dateOfBirth: '17 dec, 2024',
    familySide: 'Williams family',
    eldestFamilyMember: 'Fahad',
    profession: 'Doctor',
    address: 'Georgia, Atlanta, Usa',
    subscription: 'Premium Plan',
  });

  return (
    <div className="max-w-md mx-auto bg-gray-50 rounded-lg shadow-sm">
      {/* Header with profile picture */}
      <div className="relative bg-blue-100 p-6 flex flex-col items-center rounded-t-lg">
        <div className="w-20 h-20 rounded-full bg-teal-100 border-2 border-white overflow-hidden mb-2">
          <img
            src="/api/placeholder/200/200"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-xl font-bold">{profileData.name}</h2>
        <p className="text-gray-600 text-sm">User</p>
      </div>

      {/* Profile details */}
      <div className="p-4">
        <div className="space-y-4">
          <ProfileField label="Name" value={profileData.name} />
          <ProfileField label="Email" value={profileData.email} />
          <ProfileField
            label="Contact No"
            value={profileData.contactNo}
            badge="Preferred method"
          />
          <ProfileField label="Date of birth" value={profileData.dateOfBirth} />
          <ProfileField label="Family side" value={profileData.familySide} />
          <ProfileField
            label="Eldest family member"
            value={profileData.eldestFamilyMember}
          />
          <ProfileField label="Profession" value={profileData.profession} />
          <ProfileField label="Address" value={profileData.address} />
          <ProfileField
            label="Subscription"
            value={profileData.subscription}
            highlight
          />
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, badge, highlight }) {
  return (
    <div className="border-b border-gray-200 pb-2 last:border-none">
      <div className="text-gray-700 font-medium">{label}</div>
      <div className="flex items-center">
        <div className={highlight ? 'text-blue-600' : 'text-gray-600'}>
          {value}
        </div>
        {badge && (
          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
