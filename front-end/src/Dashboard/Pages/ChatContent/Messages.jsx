import React from "react";
import ReactEmoji from "react-emoji";
const MessagesVendor = ({ message, name }) => {
  let isSentByCurrentUser = false;
  let { text, sender } = message;
  const trimmedName = name?.trim().toLowerCase();
  if (sender.toLowerCase() === trimmedName) {
    isSentByCurrentUser = true;
  } else {
  }

  return isSentByCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sentText pr-10'>{trimmedName}</p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className='messageBox backgroundLight'>
        <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
      </div>
      <p className='sentText pl-10 '>{sender}</p>
    </div>
  );
};

export default MessagesVendor;
