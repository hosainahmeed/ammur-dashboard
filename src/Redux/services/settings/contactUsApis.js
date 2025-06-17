import baseApis from '../../baseApis/baseApis';

const contactUsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmail: builder.query({
      query: () => ({
        url: '/emails',
        method: 'GET',
      }),
      providesTags: ['email'],
    }),
    createEmail: builder.mutation({
      query: ({ data }) => ({
        url: '/emails/create-email',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['email'],
    }),
    updateEmail: builder.mutation({
      query: ({ id, data }) => ({
        url: `/emails/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['email'],
    }),
    deleteEmail: builder.mutation({
      query: ({id}) => ({
        url: `/emails/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['email'],
    }),
  }),
});

export const {
  useGetAllEmailQuery,
  useCreateEmailMutation,
  useUpdateEmailMutation,
  useDeleteEmailMutation,
} = contactUsApis;
