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
    deleteTimeline: builder.mutation({
      query: (id) => ({
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
    }),
    updateTimeline: builder.mutation({
      query: ({ id, data }) => ({
        url: `/timelines/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['timeline'],
    })
  }),
});

export const {
  useGetTimelineQuery,
  useCreateTimelineMutation,
  useDeleteTimelineMutation,
  useGetSingleTimelineQuery,
} = timelineApis;
