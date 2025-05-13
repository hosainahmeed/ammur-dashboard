import baseApis from '../../../baseApis/baseApis';

const driverApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getDriver: builder.query({
      query: ({ id }) => ({
        url: '/dashboard/get-driver',
        method: 'GET',
        params: {
          driverId: id,
        },
      }),
    }),
  }),
});

export const { useGetDriverQuery } = driverApis;
