import React, { useEffect } from "react";
import Layout from "@/components/provider_home/Layout/Layout";
import Profile from "@/components/provider_home/Profile/Profile";
import styles from "./profile_page.module.css";
const ProfilePage = () => {
  return (
    <>
      <Layout>
        <div className={styles.contentDiv}>
          <Profile />
        </div>
      </Layout>
    </>
  );
};

export default ProfilePage;
