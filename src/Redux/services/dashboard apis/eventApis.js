import baseApis from '../../baseApis/baseApis';

const eventApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: () => ({
        url: '/events',
        method: 'GET',
      }),
      providesTags: ['event'],
    }),
    createEvent: builder.mutation({
      query: ({ data }) => ({
        url: '/events/create-event',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['event'],
    }),
    updateEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['event'],
    }),
    deleteEvent: builder.mutation({
      query: ({ id }) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['event'],
    }),
  }),
});

export const {
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApis;
