import baseApis from '../../baseApis/baseApis';

const timelineApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTimeline: builder.query({
      query: () => ({
        url: `/timelines`,
        method: 'GET',
      }),
      providesTags: ['timeline'],
    }),
  }),
});

export const { useGetTimelineQuery } = timelineApis;
