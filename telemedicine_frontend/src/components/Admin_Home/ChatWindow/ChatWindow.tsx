import React from "react";
import ChatMessage from "./ChatMessage/ChatModuls";


const ChatWindow = () => {
  const yourUserID = "user2";
  const messages = [
    { senderID: "user1", receiverID: "user2", message: "Hello!", timestamp: "2023-09-19T10:00:00Z" },
    { senderID: "user2", receiverID: "user1", message: "Hi there!", timestamp: "2023-09-19T10:01:00Z" },
    { senderID: "user1", receiverID: "user2", message: "How are you?", timestamp: "2023-09-19T10:02:00Z" },
    { senderID: "user1", receiverID: "user2", message: "Hello!", timestamp: "2023-09-19T10:00:00Z" },
    { senderID: "user2", receiverID: "user1", message: "Hi there!", timestamp: "2023-09-19T10:01:00Z" },
    { senderID: "user1", receiverID: "user2", message: "How are you?", timestamp: "2023-09-19T10:02:00Z" },
    { senderID: "user1", receiverID: "user2", message: "Hello!", timestamp: "2023-09-19T10:00:00Z" },
    { senderID: "user2", receiverID: "user1", message: "Hi there!", timestamp: "2023-09-19T10:01:00Z" },
  ];

  return (
    <div className="chat-window" style={{ display: "flex", flexDirection: "column" }}>
      {messages.map((msg, index) => (
        <ChatMessage 
          key={index} 
          senderID={msg.senderID} 
          receiverID={msg.receiverID} 
          message={msg.message} 
          timestamp={msg.timestamp} 
          yourUserID={yourUserID}
        />
      ))}
      <div style={{position:"sticky",bottom:"12%"}}>
        hvhjkkj
      </div>
    </div>
  );
};

export default ChatWindow;