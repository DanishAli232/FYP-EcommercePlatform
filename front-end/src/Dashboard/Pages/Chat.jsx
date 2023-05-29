import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../Components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { GlobalContext } from "../../Context";
import axios from "axios";
import io from "socket.io-client";
import MessagesVendor from "./ChatContent/Messages";
import ScrollToBottom from "react-scroll-to-bottom";
import Input from "./ChatContent/Input";
import {
  DashboardContext,
  DashboardGlobalContext,
} from "../Context/DashboardContext";

const ENDPOINT = "http://localhost:3000";

let socket;
const ChatVendor = () => {
  const [OPEN, setOPEN] = useState(false);
  const [message, setMessage] = useState("");
  const [uid0, setuid0] = useState("");
  const [vid0, setvid0] = useState("");
  const [users, setusers] = useState([]);
  const [messages, setmessages] = useState([]);
  const { setdashboardOpen, state } = useContext(GlobalContext);
  const fetchCustomers = async () => {
    console.log("okk1");
    try {
      let { data } = await axios.get(
        `/api/chatcustomers/${state.userInfo.user._id}`
      );
      console.log(data);
      setusers(data);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  const { VendorContent, setVendorContent, setsidebar } = useContext(
    DashboardGlobalContext
  );

  const updatelist = () => {
    let data1;

    if (state?.userInfo?.user?.status === "vendor") {
      data1 = VendorContent;
    }
    let data = data1.map(function (x) {
      x.active = false;
      return x;
    });
    setVendorContent(data);
    let objIndex = data1.findIndex((obj) => obj.title === "Chat");
    data1[objIndex].active = true;
  };

  useEffect(() => {
    setdashboardOpen(true);
    updatelist();
    setsidebar("none");
    fetchCustomers();
  }, []);
  let socketRequest = (uid, vid) => {
    socket = io(ENDPOINT);

    socket.emit(
      "join",
      {
        userID: uid,
        vendorID: vid,
        username: state?.userInfo?.user?.storename,
        vendor: undefined,
      },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );

    socket.on("message", (message) => {
      console.log(message);
      setmessages((messages) => [
        ...messages,
        { text: message.text, sender: message.user },
      ]);
    });
  };
  useEffect(() => {
    let uniqueMessages1 = messages.filter(
      (msg, index, self) =>
        index ===
        self.findIndex((m) => m.text === msg.text && m.sender === msg.sender)
    );
    setmessages(uniqueMessages1);
  }, [messages]);

  const fetchChat = async (id) => {
    let data = users.find((item, i) => {
      return item.customer._id === id;
    });
    console.log(data);
    setuid0(data?.customer?._id);
    setvid0(data?.vendor?._id);
    setmessages(data.chat);
    setOPEN(true);
    socketRequest(data.customer._id, data.vendor._id);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const messageData = {
      sender: uid0,
      receiver: vid0,
      message: message,
      name: state?.userInfo?.user?.storename,
    };
    console.log(messageData);
    socket.emit("sendMessage", messageData, () => setMessage(""));
  };

  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", minHeight: "100vh" }}>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={10}>
          <Navbar />
          <Box sx={{ height: "569px" }}>
            <Box
              sx={{
                backgroundColor: "white",
                marginTop: "89px",
                marginLeft: { md: "32px", xs: "0px" },
                marginRight: { md: "32px", xs: "0px" },
                borderRadius: "0.75rem",
                boxShadow:
                  "rgba(255, 255, 255, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
                border: "1px solid rgba(224,224, 224, 1)",
                // marginBottom: "10px",
              }}
            >
              <Box
                sx={{
                  paddingLeft: { md: "17px", xs: "9px" },
                  paddingTop: "20px",
                  paddingRight: { md: "17px", xs: "9px" },
                  paddingBottom: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "9px",
                  }}
                >
                  {users.map((item, i) => (
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "#00000085",
                        textTransform: "uppercase",
                        padding: "10px",
                        borderRight: "1px solid #00000029",
                      }}
                      onClick={() => fetchChat(item.customer._id)}
                    >
                      {item?.customer?.name}
                    </Typography>
                  ))}

                  {/* <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage1}
        /> */}
                </Box>
                {OPEN && (
                  <ScrollToBottom
                    className='messages1'
                    // style={{ height: "500px" }}
                  >
                    {messages.map((message, i) => (
                      <div key={i}>
                        <MessagesVendor
                          message={message}
                          name={users[0]?.vendor?.storename}
                        />
                      </div>
                    ))}
                  </ScrollToBottom>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "20px",
                    // background: "#fbfbfb",
                    width: "100%",
                  }}
                >
                  {/* <Box
                    sx={{ height: "56px", margin: "10px 0px", width: "90%" }}
                  > */}{" "}
                  <TextField
                    sx={{ width: "91%" }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id='standard-basic'
                    label='Type'
                    variant='outlined'
                  />
                  <Button
                    onClick={sendMessage}
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
                  {/* </Box> */}
                </Box>
                {/* <Input
                  message={message}
                  setMessage={setMessage}
                  sendMessage={sendMessage}
                /> */}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatVendor;
