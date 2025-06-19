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
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/interview-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['interviewCategory'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/interview-categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['interviewCategory'],
    }),
    // interview
    getAllInterview: builder.query({
      query: (id) => ({
        url: `/interviews/category-id/${id}`,
        method: 'GET',
      }),
      providesTags: ['interview'],
    }),
    deleteInterview: builder.mutation({
      query: (id) => ({
        url: `/interviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['interview', 'interviewCategory'],
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
      query: ({ data }) => {
        console.log(data);
        return {
          url: '/interviews/create-interview',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['interview'],
    }),
  }),
});

export const {
  //category
  useGetAllInterCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  // interview CRUD
  useGetAllInterviewQuery,
  useDeleteInterviewMutation,
  useUpdateInterviewMutation,
  useCreateInterviewMutation,
} = interviewApis;
