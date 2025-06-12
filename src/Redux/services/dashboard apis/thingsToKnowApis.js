import baseApis from '../../baseApis/baseApis';

const thingsToKnowApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetThingsToKnowQuery,
  useSingleThingsToKnowQuery,
  useUpdateThingsToKnowMutation,
} = thingsToKnowApis;
