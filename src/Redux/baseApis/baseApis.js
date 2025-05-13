import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApis = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  }),
  tagTypes: ['car', 'profile', 'privacyPolicy', 'termsAndConditions', 'dCoins'],
  endpoints: () => ({}),
});

export default baseApis;
