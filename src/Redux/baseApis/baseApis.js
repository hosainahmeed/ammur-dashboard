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
    'about',
    'families',
    'profile',
    'timelineSingle',
  ],
  endpoints: () => ({}),
});

export default baseApis;
