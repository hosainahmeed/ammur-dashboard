import baseApis from '../../baseApis/baseApis';

const notificationApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => ({
        url: '/notifications',
        method: 'GET',
      }),
      providesTags: ['notification'],
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'POST',
      }),
      invalidatesTags: ['notification'],
    }),
  }),
});

export const { useGetNotificationQuery, useMarkAsReadMutation } =
  notificationApis;
