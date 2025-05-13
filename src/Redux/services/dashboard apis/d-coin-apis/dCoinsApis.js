import baseApis from '../../../baseApis/baseApis';

const dCoinsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getDCoins: builder.query({
      query: () => ({
        url: '/dcoin/get-all-dCoins',
        method: 'GET',
      }),
      providesTags: ['dCoins'],
    }),
  }),
});

export const { useGetDCoinsQuery } = dCoinsApis;
