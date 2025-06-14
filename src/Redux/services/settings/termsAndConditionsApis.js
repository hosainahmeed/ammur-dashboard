import baseApis from '../../baseApis/baseApis';

const termsAndConditionsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: '/terms',
        method: 'GET',
      }),
      providesTags: ['termsAndConditions'],
    }),
    updateTermsAndConditions: builder.mutation({
      query: ({ requestData }) => ({
        url: '/terms/create-term',
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
