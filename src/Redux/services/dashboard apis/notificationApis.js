import baseApis from '../../baseApis/baseApis';

const notificationApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: ({ userId, role }) => ({
        url: '/notifications',
        method: 'GET',
        params: { userId, role },
      }),
      providesTags: ['notification'],
    }),
    markAsRead: builder.mutation({
      query: ({ id, data }) => ({
        url: `/notifications/${id}/read`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['notification'],
    }),
  }),
});

export const { useGetNotificationQuery, useMarkAsReadMutation } =
  notificationApis;
