import baseApis from '../../baseApis/baseApis';

const legacyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getLegacy: builder.query({
      query: () => ({
        url: '/legacies',
        method: 'GET',
      }),
      providesTags: ['legacy'],
    }),
    createLegacy: builder.mutation({
      query: (data) => ({
        url: '/legacies/create-legacy',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['legacy'],
    }),
    deleteLegacy: builder.mutation({
      query: (id) => ({
        url: `/legacies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['legacy'],
    }),
  }),
});

export const {
  useGetLegacyQuery,
  useDeleteLegacyMutation,
  useCreateLegacyMutation,
} = legacyApis;
