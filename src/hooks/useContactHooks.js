import {
  useGetAllEmailQuery,
  useCreateEmailMutation,
  useUpdateEmailMutation,
  useDeleteEmailMutation,
  useGetAllPhoneQuery,
  useCreatePhoneMutation,
  useUpdatePhoneMutation,
  useDeletePhoneMutation,
  useSocialMediaQuery,
  useCreateSocialMediaMutation,
  useUpdateSocialMediaMutation,
  useDeleteSocialMediaMutation,
} from '../Redux/services/settings/contactUsApis';

export const useContactHooks = () => {
  const { data: emailsData } = useGetAllEmailQuery();
  const [createEmail] = useCreateEmailMutation();
  const [updateEmail] = useUpdateEmailMutation();
  const [deleteEmail] = useDeleteEmailMutation();

  const { data: phoneData } = useGetAllPhoneQuery();
  const [createPhone] = useCreatePhoneMutation();
  const [updatePhone] = useUpdatePhoneMutation();
  const [deletePhone] = useDeletePhoneMutation();

  const { data: socialMediaData } = useSocialMediaQuery();
  const [createSocialMedia] = useCreateSocialMediaMutation();
  const [updateSocialMedia] = useUpdateSocialMediaMutation();
  const [deleteSocialMedia] = useDeleteSocialMediaMutation();

  return {
    emailsData,
    createEmail,
    updateEmail,
    deleteEmail,
    phoneData,
    createPhone,
    updatePhone,
    deletePhone,
    socialMediaData,
    createSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
  };
};
