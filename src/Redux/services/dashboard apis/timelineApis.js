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
    createTimeline: builder.mutation({
      query: ({ data }) => ({
        url: `/timelines/create-timeline`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['timeline'],
    }),
  }),
});

export const { useGetTimelineQuery, useCreateTimelineMutation } = timelineApis;
