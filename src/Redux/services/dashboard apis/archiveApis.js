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
      invalidatesTags: ['archive'],
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
    //sub category
    getAllSubArchive: builder.query({
      query: ({ id }) => ({
        url: '/archieves',
        method: 'GET',
        params: { archieveCategoryId: id },
      }),
      providesTags: ['archive', 'archiveSub'],
    }),
    createSubArchive: builder.mutation({
      query: ({ data }) => ({
        url: '/archieves/create-archieve',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['archive', 'archiveSub'],
    }),
    updateSubArchive: builder.mutation({
      query: ({ id, data }) => ({
        url: `/archieves/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['archive', 'archiveSub'],
    }),
    deleteSubArchive: builder.mutation({
      query: ({ id }) => ({
        url: `/archieves/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['archive', 'archiveSub'],
    }),
    getSingleSubArchive: builder.query({
      query: ({ id }) => ({
        url: `/archieves/${id}`,
        method: 'GET',
      }),
      providesTags: ['archive', 'archiveSub'],
    }),
  }),
});

export const {
  useCreateArchiveMutation,
  useGetAllArchiveQuery,
  useUpdateArchiveMutation,
  useDeleteArchiveMutation,
  //sub category
  useGetAllSubArchiveQuery,
  useCreateSubArchiveMutation,
  useUpdateSubArchiveMutation,
  useDeleteSubArchiveMutation,
  useGetSingleSubArchiveQuery,
} = archiveApis;
