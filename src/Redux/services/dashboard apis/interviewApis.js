import baseApis from '../../baseApis/baseApis';

const interviewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    //category
    getAllInterCategory: builder.query({
      query: () => ({
        url: '/interview-categories',
        method: 'GET',
      }),
      providesTags: ['interviewCategory'],
    }),
    createCategory: builder.mutation({
      query: ({ data }) => ({
        url: '/interview-categories/create-interview-category',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['interviewCategory'],
    }),
    // interview
    getAllInterview: builder.query({
      query: () => ({
        url: '/interviews',
        method: 'GET',
      }),
      providesTags: ['interview'],
    }),
    deleteInterview: builder.mutation({
      query: (id) => ({
        url: `/interviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['interview'],
    }),
    updateInterview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/interviews/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['interview'],
    }),
    createInterview: builder.mutation({
      query: ({ data }) => ({
        url: '/interviews/create-interview',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['interview'],
    }),
  }),
});

export const {
  //category
  useGetAllInterCategoryQuery,
  useCreateCategoryMutation,
  // interview CRUD
  useGetAllInterviewQuery,
  useDeleteInterviewMutation,
  useUpdateInterviewMutation,
  useCreateInterviewMutation,
} = interviewApis;
