import React from 'react';
import { Tabs } from 'antd';
import EmailTab from './tab/EmailTab';
import PhoneTab from './tab/PhoneTab';
import SocialTab from './tab/SocialTab';
import { MailOutlined, PhoneOutlined, GithubOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

const ContactTabs = ({
  emails,
  phones,
  socials,
  addEmail,
  editEmail,
  deleteEmailhandle,
  addPhone,
  editPhone,
  deletePhonehandle,
  addSocial,
  editSocial,
  deleteSocial,
}) => {
  return (
    <Tabs defaultActiveKey="1" type="card" className="contact-tabs">
      <TabPane
        tab={
          <span>
            <MailOutlined /> Email Addresses
          </span>
        }
        key="1"
      >
        <EmailTab
          emails={emails}
          addEmail={addEmail}
          editEmail={editEmail}
          deleteEmailhandle={deleteEmailhandle}
        />
      </TabPane>

      <TabPane
        tab={
          <span>
            <PhoneOutlined /> Phone Numbers
          </span>
        }
        key="2"
      >
        <PhoneTab
          phones={phones}
          addPhone={addPhone}
          editPhone={editPhone}
          deletePhonehandle={deletePhonehandle}
        />
      </TabPane>

      <TabPane
        tab={
          <span>
            <GithubOutlined /> Social Media
          </span>
        }
        key="3"
      >
        <SocialTab
          socials={socials}
          addSocial={addSocial}
          editSocial={editSocial}
          deleteSocial={deleteSocial}
        />
      </TabPane>
    </Tabs>
  );
};

export default ContactTabs;
