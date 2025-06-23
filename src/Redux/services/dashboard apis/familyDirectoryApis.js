import baseApis from '../../baseApis/baseApis';

const familyDirectoryApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getFamilyDirectory: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['familyDirectory'],
    }),
  }),
});

export const { useGetFamilyDirectoryQuery } = familyDirectoryApis;
