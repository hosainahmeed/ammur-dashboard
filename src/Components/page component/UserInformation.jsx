import React from 'react';

export default function UserInformation({ user }) {
  if (!user) return null;

  // You can format dates or handle missing data here
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : '-';

  return (
    <div className="max-w-md mx-auto bg-gray-50 rounded-lg shadow-sm">
      <div className="relative bg-blue-100 p-6 flex flex-col items-center rounded-t-lg">
        <div className="w-20 h-20 rounded-full bg-teal-100 border-2 border-white overflow-hidden mb-2">
          {user.img ? (
            <img
              src={user.img}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
              {user.fullName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold">{user.fullName}</h2>
        <p className="text-gray-600 text-sm">User</p>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <ProfileField label="Name" value={user.fullName} />
          <ProfileField label="Email" value={user.email} />
          <ProfileField
            label="Contact No"
            value={user.contactNo}
            badge={
              user.preferedContactMethod === 'email'
                ? 'Preferred: Email'
                : 'Preferred: Phone'
            }
          />
          <ProfileField label="Date Joined" value={joinedDate} />
          <ProfileField label="Family side" value={user.familySide} />
          <ProfileField
            label="Eldest family member"
            value={user.eldestRelative || user.eldestFamilyMember || '-'}
          />
          <ProfileField label="Profession" value={user.proffession || '-'} />
          <ProfileField label="Address" value={user.address || '-'} />
          <ProfileField
            label="Subscription"
            value={user.subscription}
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
          {value || '-'}
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
