import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";
import { useLocation } from "react-router-dom";

const ENDPOINT = "http://localhost:3000";

let socket;

const Chat = () => {
  const [username, setusername] = useState("");
  const [vendor, setvendor] = useState("");
  const location = useLocation();
  const { state } = useLocation();

  const [userID, setuserID] = useState("");
  const [vendorID, setvendorID] = useState("");
  const [users, setUsers] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const { userID, vendorID } = queryString.parse(location.search);
    console.log({ userID, vendorID });
    setuserID(userID);
    setvendorID(vendorID);
    socket = io(ENDPOINT);
    setusername(state.username);
    setvendor(state.storename);

    //   socket.emit("join", { userID, vendorID }, (error) => {
    //     if (error) {
    //       alert(error);
    //     }
    //   });
  }, []);

  // useEffect(() => {
  //   socket.on("receiveMessage", (data) => {
  //     setMessageList([...messageList, data]);
  //   });
  // }, [messageList]);

  const sendMessage1 = () => {
    const messageData = {
      sender: userID,
      receiver: vendorID,
      message: message,
    };

    socket.emit("sendMessage", messageData);
    setMessageList([...messageList, messageData]);
    setMessage("");
  };
  // useEffect(() => {
  //   const { userID, vendorID } = queryString.parse(location.search);

  //   console.log({ userID, vendorID });
  //   const socket = io("http://localhost:3000");

  //   setRoom(vendorID);
  //   setName(userID);

  //   socket.emit("join", { userID, vendorID }, (error) => {
  //     if (error) {
  //       alert(error);
  //     }
  //   });
  // }, [ENDPOINT, location.search]);

  // useEffect(() => {
  //   socket.on("message", (message) => {
  //     setMessages((messages) => [...messages, message]);
  //   });

  //   socket.on("roomData", ({ users }) => {
  //     console.log(users);
  //     setUsers(users);
  //   });
  // }, []);

  // const sendMessage = (event) => {
  //   event.preventDefault();

  //   if (message) {
  //     socket.emit("sendMessage", message, () => setMessage(""));
  //   }
  // };
  return (
    // <div>
    //   <ul>
    //     {messageList.map((data, index) => {
    //       return (
    //         <li key={index}>
    //           <p>{data.sender}: </p>
    //           <p>{data.message}</p>
    //         </li>
    //       );
    //     })}
    //   </ul>
    //   <input
    //     type='text'
    //     placeholder='Type message'
    //     value={message}
    //     onChange={(e) => setMessage(e.target.value)}
    //   />
    //   <button onClick={sendMessage1}>Send</button>
    // </div>
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar vendorID={vendorID} />
        <Messages messages={messages} userID={userID} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage1}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
