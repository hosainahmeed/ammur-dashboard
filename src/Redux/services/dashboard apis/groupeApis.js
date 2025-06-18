import baseApis from '../../baseApis/baseApis';

const groupeApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getGroupes: build.query({
      query: () => ({
        url: '/rooms',
        method: 'GET',
      }),
      providesTags: ['groupes','families'],
    }),
  }),
});

export const { useGetGroupesQuery } = groupeApis;
