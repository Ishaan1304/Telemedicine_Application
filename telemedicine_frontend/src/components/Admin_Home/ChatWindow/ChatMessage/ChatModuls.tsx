import React from "react";
import styles from "./ChatMessage.module.css";


interface ChatMessageProps {
    senderID: string;
    receiverID: string;
    message: string;
    timestamp: string; 
    yourUserID: string;
  }

const ChatMessage: React.FC<ChatMessageProps> = ({ senderID, receiverID, message, timestamp, yourUserID }) => {
  const isSender = senderID === yourUserID;

  
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`${styles.message} ${isSender ? styles.sent : styles.received}`}>
      <p>{message}</p>
      <span className={styles.timestamp}>{formattedTime}</span>
    </div>
  );
};

export default ChatMessage;
