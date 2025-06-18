import baseApis from '../../baseApis/baseApis';

const adminApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createAdmins: builder.mutation({
      query: ({ data }) => ({
        url: '/users/create-user',
        method: 'POST',
        body: data,
      }),
      providesTags: ['user'],
    }),
  }),
});

export const { useCreateAdminsMutation } = adminApis;
