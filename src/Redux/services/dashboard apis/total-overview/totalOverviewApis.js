import baseApis from '../../../baseApis/baseApis';

const totalOverviewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTotalOverview: builder.query({
      query: () => ({
        url: '/dashboard/total-overview',
        method: 'GET',
      }),
    }),
    growthOverview: builder.query({
      query: ({ role, year }) => ({
        url: '/dashboard/growth',
        method: 'GET',
        params: {
          role,
          year,
        },
      }),
    }),
  }),
});

export const { useGetTotalOverviewQuery, useGrowthOverviewQuery } =
  totalOverviewApis;
