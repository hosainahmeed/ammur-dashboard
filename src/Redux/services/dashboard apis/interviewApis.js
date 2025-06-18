import baseApis from '../../baseApis/baseApis';

const interviewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllInterview: builder.query({
      query: () => ({
        url: '/interviews',
        method: 'GET',
      }),
      providesTags: ['interview'],
    }),
  }),
});

export const { useGetAllInterviewQuery } = interviewApis;
