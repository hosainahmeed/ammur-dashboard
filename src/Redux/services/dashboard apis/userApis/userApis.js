import baseApis from '../../../baseApis/baseApis';

export const userApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ role }) => ({
        url: '/users',
        method: 'GET',
        params: {
          role: role,
        },
      }),
    }),
    requiestUser: builder.query({
      query: () => ({
        url: '/users/sign-up-request',
        method: 'GET',
      }),
    }),
    updateUserStatus: builder.mutation({
      query: ({ data }) => ({
        url: `/dashboard/block-unblock-user-driver`,
        method: 'PATCH',
        body: data,
      }),
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
} = userApis;
