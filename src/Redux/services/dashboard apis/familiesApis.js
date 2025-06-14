import baseApis from '../../baseApis/baseApis';

const familiesApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getFamilies: builder.query({
      query: () => ({
        url: '/families',
        method: 'GET',
      }),
      providesTags: ['families'],
    }),
    deleteFamily: builder.mutation({
      query: (id) => ({
        url: `/families/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['families'],
    }),
  }),
});
export const { useGetFamiliesQuery, useDeleteFamilyMutation } = familiesApis;
