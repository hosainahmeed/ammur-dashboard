import baseApis from '../../baseApis/baseApis';

const termsAndConditionsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: '/manage/get-terms-conditions',
        method: 'GET',
      }),
      providesTags: ['termsAndConditions'],
    }),
    updateTermsAndConditions: builder.mutation({
      query: ({ requestData }) => ({
        url: '/manage/add-terms-conditions',
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: ['termsAndConditions'],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} = termsAndConditionsApis;
