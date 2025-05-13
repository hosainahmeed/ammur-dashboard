import baseApis from '../../baseApis/baseApis';

export const authApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ data }) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),
    sendVerificationEmail: builder.mutation({
      query: ({ data }) => ({
        url: '/verification/create',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtpCode: builder.mutation({
      query: ({ data }) => ({
        url: '/verification/verify',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('resetToken')}`,
        },
      }),
    }),
    resendResetOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/resend-reset-code',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useChangePasswordMutation,
  useSendVerificationEmailMutation,
  useVerifyOtpCodeMutation,
  useResetPasswordMutation,
  useResendResetOtpMutation,
} = authApis;

export default authApis;