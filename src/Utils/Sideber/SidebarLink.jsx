import React from 'react';
import { MdAddHomeWork, MdDashboard } from 'react-icons/md';
import { FaCog, FaUser } from 'react-icons/fa';
import { BiSolidArchive } from 'react-icons/bi';
import { GiBookmarklet, GiGiftOfKnowledge } from 'react-icons/gi';
import { BsPersonVideo2 } from 'react-icons/bs';
import { RiAdminFill, RiCalendarEventFill } from 'react-icons/ri';
import { FaBowlFood } from 'react-icons/fa6';
import { SiLegacygames } from 'react-icons/si';

export const SuperAdmin = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: MdDashboard,
    link: '/',
  },
  {
    key: 'userManagement',
    label: 'User management',
    icon: FaUser,
    children: [
      {
        key: 'all-user',
        label: 'All User',
        link: '/user/all-user',
      },
      {
        key: 'sign-up-request',
        label: 'Sign Up Request',
        link: '/user/sign-up-request',
      },
      {
        key: 'manage-admins',
        label: 'Manage Admins',
        link: '/manage-admins',
      },
    ],
  },
  {
    key: 'timeline',
    label: 'History timeline',
    icon: GiBookmarklet,
    link: '/timeline',
  },
  {
    key: 'things-to-know',
    label: 'Things to know',
    icon: GiGiftOfKnowledge,
    link: '/things-to-know',
  },
  {
    key: 'interviews',
    label: 'Interviews',
    icon: BsPersonVideo2,
    link: '/interviews',
  },
  {
    key: 'family-management',
    label: 'Family Management',
    icon: MdAddHomeWork,
    link: '/family-management',
    children: [
      {
        key: 'add-family',
        label: 'Add Family',
        link: '/add-family',
      },
      {
        key: 'family-archive',
        label: 'Family Archive',
        link: '/family-archive',
      },
    ],
  },
  {
    key: 'events',
    label: 'Events',
    icon: RiCalendarEventFill,
    link: '/events',
  },
  {
    key: 'recipe',
    label: 'Recipe',
    icon: FaBowlFood,
    link: '/recipe',
  },
  {
    key: 'legacy-tribute',
    label: 'Legacy & Tribute',
    icon: SiLegacygames,
    link: '/legacy-tribute',
  },

  {
    key: 'settings',
    label: 'Settings',
    icon: FaCog,
    link: '/dashboard/Settings/profile',
    children: [
      {
        key: 'contact-us',
        label: 'Contact Us',
        link: '/dashboard/Settings/contact-us',
      },
      {
        key: 'about-us',
        label: 'About Us',
        link: '/dashboard/Settings/about-us',
      },
      {
        key: 'terms',
        label: 'Terms & Condition',
        link: '/dashboard/Settings/Terms&Condition',
      },
      {
        key: 'privacy',
        label: 'Privacy Policy',
        link: '/dashboard/Settings/PrivacyPolicy',
      },
      {
        key: 'profile',
        label: 'Profile',
        link: '/dashboard/Settings/profile',
      },
    ],
  },
];
export const admin = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: MdDashboard,
    link: '/',
  },
  {
    key: 'userManagement',
    label: 'User management',
    icon: FaUser,
    children: [
      {
        key: 'all-user',
        label: 'All User',
        link: '/user/all-user',
      },
      {
        key: 'sign-up-request',
        label: 'Sign Up Request',
        link: '/user/sign-up-request',
      },
    ],
  },
  {
    key: 'timeline',
    label: 'History timeline',
    icon: GiBookmarklet,
    link: '/timeline',
  },
  {
    key: 'things-to-know',
    label: 'Things to know',
    icon: GiGiftOfKnowledge,
    link: '/things-to-know',
  },
  {
    key: 'interviews',
    label: 'Interviews',
    icon: BsPersonVideo2,
    link: '/interviews',
  },
  {
    key: 'family-management',
    label: 'Family Management',
    icon: MdAddHomeWork,
    link: '/family-management',
    children: [
      {
        key: 'add-family',
        label: 'Add Family',
        link: '/add-family',
      },
      {
        key: 'family-archive',
        label: 'Family Archive',
        link: '/family-archive',
      },
    ],
  },
  {
    key: 'events',
    label: 'Events',
    icon: RiCalendarEventFill,
    link: '/events',
  },
  {
    key: 'recipe',
    label: 'Recipe',
    icon: FaBowlFood,
    link: '/recipe',
  },
  {
    key: 'legacy-tribute',
    label: 'Legacy & Tribute',
    icon: SiLegacygames,
    link: '/legacy-tribute',
  },

  {
    key: 'settings',
    label: 'Settings',
    icon: FaCog,
    link: '/dashboard/Settings/profile',
    children: [
      {
        key: 'contact-us',
        label: 'Contact Us',
        link: '/dashboard/Settings/contact-us',
      },
      {
        key: 'about-us',
        label: 'About Us',
        link: '/dashboard/Settings/about-us',
      },
      {
        key: 'terms',
        label: 'Terms & Condition',
        link: '/dashboard/Settings/Terms&Condition',
      },
      {
        key: 'privacy',
        label: 'Privacy Policy',
        link: '/dashboard/Settings/PrivacyPolicy',
      },
      {
        key: 'profile',
        label: 'Profile',
        link: '/dashboard/Settings/profile',
      },
    ],
  },
];
