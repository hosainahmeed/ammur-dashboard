import baseApis from '../../baseApis/baseApis';

export const privacyPolicyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: '/privacies',
        method: 'GET',
      }),
      providesTags: ['privacyPolicy'],
    }),
    updatePrivacyPolicy: builder.mutation({
      query: ({ description }) => ({
        url: '/privacies/create-privacy',
        method: 'POST',
        body: description,
      }),
      invalidatesTags: ['privacyPolicy'],
    }),
  }),
});

export const { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } =
  privacyPolicyApis;
