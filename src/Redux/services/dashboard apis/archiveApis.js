import baseApis from '../../baseApis/baseApis';

const archiveApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllArchive: builder.query({
      query: () => ({
        url: '/archieve-categories',
        method: 'GET',
      }),
      providesTags: ['archive'],
    }),
    createArchive: builder.mutation({
      query: ({ data }) => ({
        url: '/archieve-categories/create-archieve-category',
        method: 'POST',
        body: data,
      }),
      providesTags: ['archive'],
    }),
    updateArchive: builder.mutation({
      query: ({ id, data }) => ({
        url: `/archieve-categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['archive'],
    }),
    deleteArchive: builder.mutation({
      query: ({ id }) => ({
        url: `/archieve-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['archive'],
    }),
  }),
});

export const {
  useCreateArchiveMutation,
  useGetAllArchiveQuery,
  useUpdateArchiveMutation,
  useDeleteArchiveMutation,
} = archiveApis;
