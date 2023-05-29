import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import NavBar1 from "../../../Components/NavBar1";
import Navbar2 from "../../../Components/Navbar2";
import { GlobalContext } from "../../../Context";

const ENDPOINT = "http://localhost:3000";

let socket;

const Chat = () => {
  const [username, setusername] = useState("");
  const [vendor, setvendor] = useState("");
  const location = useLocation();
  const { state } = useLocation();
  const { setdashboardOpen } = useContext(GlobalContext);

  useEffect(() => {
    setdashboardOpen(false);
  });

  const [userID, setuserID] = useState("");
  const [vendorID, setvendorID] = useState("");
  const [users, setUsers] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const fetchChat = async () => {
    console.log(state.userID);
    const { userID, vendorID } = queryString.parse(location.search);
    try {
      let { data } = await axios.get(
        `/api/chatcustomersusers/${userID}/${vendorID}`
      );
      setMessages(data[0].chat);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const SocketConnection = () => {
    const { userID, vendorID } = queryString.parse(location.search);
    console.log({ userID, vendorID });
    setuserID(userID);
    setvendorID(vendorID);
    socket = io(ENDPOINT);
    setusername(state.username);
    setvendor(state.storename);

    socket.emit(
      "join",
      { userID, vendorID, username: state.username, vendor: state.storename },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
    socket.on("message", (message) => {
      setMessages((messages) => [
        ...messages,
        { text: message.text, sender: message.user },
      ]);
    });
  };
  useEffect(() => {
    fetchChat();
    SocketConnection();
  }, []);

  const sendMessage1 = (e) => {
    e.preventDefault();
    const messageData = {
      sender: userID,
      receiver: vendorID,
      message: message,
      name: state.username,
    };
    console.log(messageData);
    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <NavBar1 />
      <Navbar2 title={"Chat"} title1={"Home"} />
      <Box
        sx={{
          backgroundColor: "#fbfbfb",
          padding: { sm: "40px 69px 95px", xs: "40px 63px" },
        }}
      >
        <Box>
          {" "}
          <Messages messages={messages} name={username} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "40px",
            bottom: 0,
            background: "#fbfbfb",
            width: "100%",
            position: "fixed",
          }}
        >
          <Box sx={{ height: "56px", margin: "10px 0px", width: "90%" }}>
            {" "}
            <TextField
              sx={{ width: "91%", height: "20px" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id='standard-basic'
              label='Type'
              variant='outlined'
            />
            <Button
              onClick={sendMessage1}
              sx={{
                background: "#f0353b",
                color: "white",
                width: "90px",
                padding: "15px 9px",
                marginLeft: "6px",
                "&:hover": {
                  background: "#d90429",
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
        {/* <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage1}
        /> */}
      </Box>
    </Box>
  );
};

export default Chat;
