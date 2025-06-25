import baseApis from '../../baseApis/baseApis';

const legacyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getLegacy: builder.query({
      query: () => ({
        url: '/legacies',
        method: 'GET',
      }),
      providesTags: ['Legacy'],
    }),
    deleteLegacy: builder.mutation({
      query: (id) => ({
        url: `/legacies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Legacy'],
    }),
  }),
});

export const { useGetLegacyQuery, useDeleteLegacyMutation } = legacyApis;
