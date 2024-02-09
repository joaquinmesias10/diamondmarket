import React, { useEffect, useState } from 'react';
import { Modal } from '@redq/reuse-modal';
import { ProfileProvider } from '../contexts/profile/profile.provider';
import SettingsContent from '../features/user-profile/settings/settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from '../features/user-profile/user-profile.style';
import Sidebar from '../features/user-profile/sidebar/sidebar';
import { SEO } from '../components/seo';
import Footer from '../layouts/footer';

const ProfilePage = (props) => {

  return (
    <>
      <SEO title="Profile - Pos store" description="Profile Details" />
      <Modal>
        <PageWrapper>
          <SidebarSection>
            <Sidebar />
          </SidebarSection>
          <ContentBox>
            <SettingsContent />
          </ContentBox> 
        </PageWrapper>
      </Modal>
    </>
  );
};


export default ProfilePage
