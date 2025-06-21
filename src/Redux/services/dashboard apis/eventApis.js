import baseApis from '../../baseApis/baseApis';

const eventApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: () => ({
        url: '/events',
        method: 'GET',
      }),
      providesTags: ['event'],
    }),
  }),
});

export const { useGetEventQuery } = eventApis;
