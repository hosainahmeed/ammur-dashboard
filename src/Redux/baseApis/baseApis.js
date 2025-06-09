import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../Utils/server';

const baseApis = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  }),
  tagTypes: ['car', 'profile', 'privacyPolicy', 'termsAndConditions', 'dCoins'],
  endpoints: () => ({}),
});

export default baseApis;
