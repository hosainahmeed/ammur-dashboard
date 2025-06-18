import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../Utils/server';

const baseApis = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  }),
  tagTypes: [
    'user',
    'requiestUser',
    'privacyPolicy',
    'termsAndConditions',
    'timeline',
    'thingsToKnow',
    'thingsToKnow-single',
    'about',
    'families',
    'profile',
    'timelineSingle',
    'email',
    'phone',
    'social',
    'groupes',
    'interview',
    'interviewCategory',
  ],
  endpoints: () => ({}),
});

export default baseApis;
