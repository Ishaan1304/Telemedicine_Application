import React from "react";
import styles from "./message.module.css";
import SideBar from "@/components/provider_home/SideBar/SideBar";
import ChatWindow from "@/components/Admin_Home/ChatWindow/ChatWindow";
import Layout from "@/components/provider_home/Layout/Layout";
import ChatComponent from "@/components/provider_home/ChatComponent/ChatComponent";

const Message = () => {
  return (
    <>
      <Layout>
        <div className={styles.contentDiv}>
        <ChatComponent />
        </div>
      </Layout>
    </>
  );
};

export default Message;
