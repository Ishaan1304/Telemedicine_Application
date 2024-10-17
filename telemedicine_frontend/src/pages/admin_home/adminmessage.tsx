import React from "react";
import styles from "./adminmessage.module.css";
import AdminLayout from "@/components/Admin_Home/AdminLayout/AdminLayout";
import AdminChatComponent from "@/components/Admin_Home/AdminChatComponent/AdminChatComponent";

const Message = () => {
  return (
    <>
      <AdminLayout>
        <div className={styles.contentDiv}>
        <AdminChatComponent/>
        </div>
      </AdminLayout>
    </>
  );
};

export default Message;
