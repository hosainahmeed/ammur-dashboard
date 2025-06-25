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
    updateFamily: builder.mutation({
      query: ({ id, data }) => ({
        url: `/families/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['families'],
    }),
    createFamily: builder.mutation({
      query: ({ data }) => ({
        url: '/families/create-family',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['families'],
    }),
  }),
});
export const {
  useGetFamiliesQuery,
  useDeleteFamilyMutation,
  useUpdateFamilyMutation,
  useCreateFamilyMutation,
} = familiesApis;
