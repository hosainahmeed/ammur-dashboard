import baseApis from '../../baseApis/baseApis';

export const privacyPolicyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: '/manage/get-privacy-policy',
        method: 'GET',
      }),
      providesTags: ['privacyPolicy'],
    }),
    updatePrivacyPolicy: builder.mutation({
      query: (body) => ({
        url: '/manage/add-privacy-policy',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['privacyPolicy'],
    }),
  }),
});

export const { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } =
  privacyPolicyApis;
