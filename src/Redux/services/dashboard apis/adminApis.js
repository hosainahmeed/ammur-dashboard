import baseApis from '../../baseApis/baseApis';

const adminApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createAdmins: builder.mutation({
      query: ({ data }) => ({
        url: '/users/create-user',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    updateAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useCreateAdminsMutation } = adminApis;
