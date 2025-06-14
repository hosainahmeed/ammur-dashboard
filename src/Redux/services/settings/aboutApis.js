import baseApis from '../../baseApis/baseApis';

const aboutApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: '/abouts',
        method: 'GET',
      }),
      providesTags: ['about'],
    }),
    updateAbout: builder.mutation({
      query: ({ description }) => ({
        url: '/abouts/create-about',
        method: 'POST',
        body: {
          description: description,
        },
      }),
      invalidatesTags: ['about'],
    }),
  }),
});

export const { useGetAboutQuery, useUpdateAboutMutation } = aboutApis;
