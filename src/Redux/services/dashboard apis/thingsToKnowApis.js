import baseApis from '../../baseApis/baseApis';

const thingsToKnowApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    //category
    getThingsToKnow: builder.query({
      query: () => ({
        url: '/things-categories',
        method: 'GET',
      }),
      providesTags: ['thingsToKnow'],
    }),
    singleThingsToKnow: builder.query({
      query: ({ id }) => ({
        url: `/things-categories/${id}`,
        method: 'GET',
      }),
    }),
    updateThingsToKnow: builder.mutation({
      query: ({ id, data }) => ({
        url: `/things-categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['thingsToKnow'],
    }),
    deleteThingsToKnow: builder.mutation({
      query: ({ id }) => ({
        url: `/things-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['thingsToKnow'],
    }),
    createThingsToKnow: builder.mutation({
      query: ({ data }) => ({
        url: `/things-categories/create-thing-to-know-category`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['thingsToKnow'],
    }),

    //subCategory
    createSubCategory: builder.mutation({
      query: ({ data }) => ({
        url: `/things-to-knows/create-thing-to-know`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  //category
  useGetThingsToKnowQuery,
  useSingleThingsToKnowQuery,
  useUpdateThingsToKnowMutation,
  useDeleteThingsToKnowMutation,
  useCreateThingsToKnowMutation,
  //subCategory
  useCreateSubCategoryMutation,
} = thingsToKnowApis;
