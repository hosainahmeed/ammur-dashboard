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
      query: ({ data }) => ({
        url: `/things-categories`,
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
        url: `/things-categories`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['thingsToKnow'],
    }),

    //subCategory
  }),
});

export const {
  //category
  useGetThingsToKnowQuery,
  useSingleThingsToKnowQuery,
  useUpdateThingsToKnowMutation,
  useDeleteThingsToKnowMutation,
  //subCategory
} = thingsToKnowApis;
