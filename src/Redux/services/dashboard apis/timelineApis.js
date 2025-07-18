import baseApis from '../../baseApis/baseApis';

const timelineApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTimeline: builder.query({
      query: ({ searchTerm }) => ({
        url: `/timelines`,
        method: 'GET',
        params: { searchTerm: searchTerm },
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
    deleteTimeline: builder.mutation({
      query: ({ id }) => ({
        url: `/timelines/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['timeline'],
    }),
    getSingleTimeline: builder.query({
      query: ({ id }) => ({
        url: `/timelines/${id}`,
        method: 'GET',
      }),
      providesTags: ['timelineSingle'],
    }),
    updateTimeline: builder.mutation({
      query: ({ id, data }) => ({
        url: `/timelines/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['timeline', 'timelineSingle'],
    }),
  }),
});

export const {
  useGetTimelineQuery,
  useCreateTimelineMutation,
  useDeleteTimelineMutation,
  useGetSingleTimelineQuery,
  useUpdateTimelineMutation,
} = timelineApis;
