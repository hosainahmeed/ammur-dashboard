import baseApis from '../../baseApis/baseApis';

const totalOverviewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTotalOverview: builder.query({
      query: () => ({
        url: '/users/users-monthly',
        method: 'GET',
      }),
    }),
    growthOverview: builder.query({
      query: () => ({
        url: '/users/all-users-admins',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetTotalOverviewQuery, useGrowthOverviewQuery } =
  totalOverviewApis;
