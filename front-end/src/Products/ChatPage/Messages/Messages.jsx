import React, { useEffect, useRef, useState } from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

import "./Messages.css";

const Messages = ({ messages, name }) => {
  const containerRef = useRef(null);

  const [uniqueMessages, setuniqueMessages] = useState(messages);
  useEffect(() => {
    let uniqueMessages1 = messages.filter(
      (msg, index, self) =>
        index ===
        self.findIndex((m) => m.text === msg.text && m.sender === msg.sender)
    );
    setuniqueMessages(uniqueMessages1);
  }, [messages]);
  return (
    <div className='chat-container'>
      <ScrollToBottom className='messages' ref={containerRef}>
        {uniqueMessages.map((message, i) => (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default Messages;
