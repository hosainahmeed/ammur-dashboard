import baseApis from '../../baseApis/baseApis';

const legacyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getLegacy: builder.query({
      query: () => ({
        url: '/legacies',
        method: 'GET',
      }),
      providesTags: ['Legacy'],
    }),
  }),
});

export const { useGetLegacyQuery } = legacyApis;
