import baseApis from '../../baseApis/baseApis';

const contactUsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmail: builder.query({
      query: () => ({
        url: '/emails',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllEmailQuery } = contactUsApis;
