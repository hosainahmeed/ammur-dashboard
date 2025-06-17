import baseApis from '../../baseApis/baseApis';

const contactUsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    //email operations
    getAllEmail: builder.query({
      query: () => ({
        url: '/emails',
        method: 'GET',
      }),
      providesTags: ['email'],
    }),
    createEmail: builder.mutation({
      query: ({ data }) => ({
        url: '/emails/create-email',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['email'],
    }),
    updateEmail: builder.mutation({
      query: ({ id, data }) => ({
        url: `/emails/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['email'],
    }),
    deleteEmail: builder.mutation({
      query: ({ id }) => ({
        url: `/emails/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['email'],
    }),
    //phone operations
    getAllPhone: builder.query({
      query: () => ({
        url: '/phones',
        method: 'GET',
      }),
      providesTags: ['phone'],
    }),
    createPhone: builder.mutation({
      query: ({ data }) => ({
        url: '/phones/create-phone',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['phone'],
    }),
    updatePhone: builder.mutation({
      query: ({ id, data }) => ({
        url: `/phones/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['phone'],
    }),
    deletePhone: builder.mutation({
      query: ({ id }) => ({
        url: `/phones/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['phone'],
    }),

    //social media
    socialMedia: builder.query({
      query: () => ({
        url: '/social-medias',
        method: 'GET',
      }),
      providesTags: ['social'],
    }),
    createSocialMedia: builder.mutation({
      query: ({ data }) => ({
        url: '/social-medias/create-social-media',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['social'],
    }),
    updateSocialMedia: builder.mutation({
      query: ({ id, data }) => ({
        url: `/social-medias/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['social'],
    }),
    deleteSocialMedia: builder.mutation({
      query: ({ id }) => ({
        url: `/social-medias/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['social'],
    }),
  }),
});

export const {
  useGetAllEmailQuery,
  useCreateEmailMutation,
  useUpdateEmailMutation,
  useDeleteEmailMutation,
  //phone
  useGetAllPhoneQuery,
  useCreatePhoneMutation,
  useUpdatePhoneMutation,
  useDeletePhoneMutation,
  //social media
  useSocialMediaQuery,
  useCreateSocialMediaMutation,
  useUpdateSocialMediaMutation,
  useDeleteSocialMediaMutation,
} = contactUsApis;
