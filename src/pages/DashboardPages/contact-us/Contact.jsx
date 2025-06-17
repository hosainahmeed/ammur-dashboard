import React, { useState } from 'react';
import { Form } from 'antd';
import './Contact.css';
import PageHeading from '../../../Components/Shared/PageHeading';
import toast from 'react-hot-toast';
import ContactTabs from './ContactTabs.jsx';
import { EmailModal, PhoneModal, SocialModal } from './SocialModal.jsx';
import { useContactHooks } from '../../../hooks/useContactHooks.js';

function Contact() {
  const {
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
  } = useContactHooks();

  // Data formatting
  const emails = emailsData?.data.map((email) => ({
    id: email?._id,
    lebel: email?.lebel,
    email: email?.email,
    isDeleted: email?.isDeleted,
  }));
  const phones = phoneData?.data.map((phone) => ({
    id: phone?._id,
    lebel: phone?.lebel,
    phone: phone?.phone,
    isDeleted: phone?.isDeleted,
  }));
  const socials = socialMediaData?.data?.map((social) => ({
    id: social?._id,
    name: social?.name,
    url: social?.url,
    isDeleted: social?.isDeleted,
  }));

  // Modal states
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [socialModalVisible, setSocialModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form instances
  const [emailForm] = Form.useForm();
  const [phoneForm] = Form.useForm();
  const [socialForm] = Form.useForm();

  // Helper functions

  // Email operations
  const addEmail = () => {
    setEditingItem(null);
    emailForm.resetFields();
    setEmailModalVisible(true);
  };

  const editEmail = (record) => {
    setEditingItem(record);
    emailForm.setFieldsValue(record);
    setEmailModalVisible(true);
  };

  const deleteEmailhandle = async (id) => {
    await deleteEmail({ id: id })
      .unwrap()
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message || 'Email deleted successfully');
        }
      });
  };

  const handleEmailOk = async () => {
    try {
      const values = await emailForm.validateFields();
      if (editingItem) {
        await updateEmail({ id: editingItem.id, data: values })
          .unwrap()
          .then((res) => {
            toast.success(res?.message || 'Email updated successfully');
          });
      } else {
        await createEmail({ data: values })
          .unwrap()
          .then((res) => {
            toast.success(res?.message || 'Email added successfully');
          });
      }
      setEmailModalVisible(false);
    } catch (error) {
      toast.error(
        error?.data?.errorSources[0].message || 'Something went wrong'
      );
    }
  };

  // Phone operations
  const addPhone = () => {
    setEditingItem(null);
    phoneForm.resetFields();
    setPhoneModalVisible(true);
  };

  const editPhone = (record) => {
    setEditingItem(record);
    phoneForm.setFieldsValue(record);
    setPhoneModalVisible(true);
  };

  const deletePhonehandle = async (id) => {
    try {
      await deletePhone({ id: id })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Phone number deleted successfully');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoneOk = async () => {
    try {
      const values = await phoneForm.validateFields();
      if (editingItem) {
        await updatePhone({ id: editingItem.id, data: values })
          .unwrap()
          .then((res) => {
            toast.success(res?.message || 'Phone number updated successfully');
          });
      } else {
        await createPhone({ data: values })
          .unwrap()
          .then((res) => {
            toast.success(res?.message || 'Phone number added successfully');
          });
      }
      setPhoneModalVisible(false);
    } catch (error) {
      toast.error(
        error?.data?.errorSources[0].message || 'Something went wrong'
      );
    }
  };

  // Social media operations
  const addSocial = () => {
    setEditingItem(null);
    socialForm.resetFields();
    setSocialModalVisible(true);
  };

  const editSocial = (record) => {
    setEditingItem(record);
    socialForm.setFieldsValue(record);
    setSocialModalVisible(true);
  };

  const deleteSocial = async (id) => {
    try {
      await deleteSocialMedia({ id: id })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(
              res?.message || 'Social media account deleted successfully'
            );
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
      console.log(error);
    }
  };

  const handleSocialOk = async () => {
    try {
      socialForm.validateFields().then((values) => {
        if (editingItem) {
          updateSocialMedia({ id: editingItem.id, data: values })
            .unwrap()
            .then((res) => {
              toast.success(
                res?.message || 'Social media updated successfully'
              );
            });
        } else {
          createSocialMedia({ data: values })
            .unwrap()
            .then((res) => {
              toast.success(res?.message || 'Social media added successfully');
            });
        }
        setSocialModalVisible(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contact-dashboard">
      <PageHeading title={'Contact Information'} />

      <ContactTabs
        emails={emails}
        phones={phones}
        socials={socials}
        addEmail={addEmail}
        editEmail={editEmail}
        deleteEmailhandle={deleteEmailhandle}
        addPhone={addPhone}
        editPhone={editPhone}
        deletePhonehandle={deletePhonehandle}
        addSocial={addSocial}
        editSocial={editSocial}
        deleteSocial={deleteSocial}
      />

      <EmailModal
        visible={emailModalVisible}
        onOk={handleEmailOk}
        onCancel={() => setEmailModalVisible(false)}
        form={emailForm}
        editingItem={editingItem}
      />

      <PhoneModal
        visible={phoneModalVisible}
        onOk={handlePhoneOk}
        onCancel={() => setPhoneModalVisible(false)}
        form={phoneForm}
        editingItem={editingItem}
      />

      <SocialModal
        visible={socialModalVisible}
        onOk={handleSocialOk}
        onCancel={() => setSocialModalVisible(false)}
        form={socialForm}
        editingItem={editingItem}
      />
    </div>
  );
}

export default Contact;
