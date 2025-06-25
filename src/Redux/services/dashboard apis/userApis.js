import baseApis from '../../baseApis/baseApis';

export const userApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ role, searchTerm }) => ({
        url: '/users',
        method: 'GET',
        params: {
          role: role,
          searchTerm,
        },
      }),
      providesTags: ['user'],
    }),
    requiestUser: builder.query({
      query: ({ searchTerm }) => ({
        url: '/users/sign-up-request',
        method: 'GET',
        params: { searchTerm },
      }),
      providesTags: ['requiestUser'],
    }),
    updateUserStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/change-status/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'user',
        'requiestUser',
        'totalOverview',
        'growthOverview',
      ],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],
    }),
    getSingleUserOrDriver: builder.query({
      query: ({ id }) => ({
        url: `/dashboard/get-user`,
        method: 'GET',
        params: { userId: id },
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
  useRequiestUserQuery,
  useGetSingleUserOrDriverQuery,
  useDeleteUserMutation,
} = userApis;
