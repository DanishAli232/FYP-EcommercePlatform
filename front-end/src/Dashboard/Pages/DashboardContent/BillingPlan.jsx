import { Box, Button, CircularProgress, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../../Context";

const BillingPlan = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(GlobalContext);
  const [status, setstatus] = useState({
    basic: null,
    popular: null,
    enterprise: null,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },

        justifyContent: "space-around",
        marginTop: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "auto",
          marginRight: "7px",
          background: "white",
          width: { md: "280px", xs: "248px" },
          marginBottom: { md: "0px", xs: "14px" },
          transition: "0.3s ease-in",
          borderRadius: "15px",
          padding: "10px",
          flexDirection: "column",
          border: "1px solid #cbc0c0",
          boxShadow:
            "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
          "&:hover": {
            transform: "scale(1.1)",
            // background:
            //   "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
            // color: "white",
          },
        }}
      >
        <Box sx={{ textAlign: "end" }}>
          {" "}
          <HelpOutlineIcon sx={{ color: "#8d8080ed" }} />
        </Box>
        <Typography sx={{ fontSize: "22px" }}>Basic</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "34px" }}>$10</span>
          <Typography
            sx={{ position: "relative", top: "6px", marginLeft: "4px" }}
          >
            / MONTH
          </Typography>
        </Box>
        <Typography sx={{ margin: "10px 0px" }}>
          Get our starter plan for getting small scale services
        </Typography>
        <Box>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "#8d8080ed" }} />{" "}
            Unlimited Customer
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "#8d8080ed" }} />{" "}
            Analytical reports
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "#8d8080ed" }} /> Chat
            Support
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "#8d8080ed" }} />{" "}
            Unlimited Emails
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "#8d8080ed" }} /> SEO
            Support
          </Typography>
          <Button
            onClick={async () => {
              const currentDate = new Date();
              const futureDate = new Date();
              futureDate.setMonth(currentDate.getMonth() + 1);
              setstatus({ ...status, basic: true });
              let payment = {
                amount: "10$",
                status: "pending",
                Date: currentDate,
                recepient: "Muhammad Danish",
                paymentMethod: "Stripe",
                BillingPlan: "Basic",
                nextpayment: futureDate,
                currentpayment: "10$",
                currentpaymentDate: currentDate,
                vendor: state?.userInfo?.user?._id,
              };

              let { data } = await axios.post("/api/updatepayment", payment);
              const successUrl = "https://localhost:3000/checkout-success";
              ctxDispatch({ type: "USER_SIGNIN", payload: data });
              localStorage.setItem("userInfo", JSON.stringify(data));
              window.location.href = `https://buy.stripe.com/test_3cs02F4lEaW44GA8wy?success_url=${encodeURIComponent(
                successUrl
              )}`;
            }}
            sx={{
              background:
                "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
              color: "white",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margin: "10px 0px 10px 0px",
              border: "1px solid #c5b3b3b0",

              "&:hover": {
                background: "white",
                color: "rgb(52,71,103)",
              },
            }}
          >
            Choose Plan{" "}
            {status.basic && (
              <CircularProgress sx={{ ml: 1, color: "white" }} size='16px' />
            )}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "auto",
          marginRight: "7px",
          //   background: "white",
          background:
            "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
          color: "white",
          width: { md: "280px", xs: "248px" },
          marginBottom: { md: "0px", xs: "14px" },
          transition: "0.3s ease-in",
          borderRadius: "15px",
          padding: "10px",
          flexDirection: "column",
          border: "1px solid #cbc0c0",
          boxShadow:
            "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Box sx={{ textAlign: "end" }}>
          {" "}
          <HelpOutlineIcon sx={{ color: "white" }} />
        </Box>
        <Typography sx={{ fontSize: "22px" }}>Popular</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "34px" }}>$20</span>
          <Typography
            sx={{ position: "relative", top: "6px", marginLeft: "4px" }}
          >
            / 4 MONTH
          </Typography>
        </Box>
        <Typography sx={{ margin: "10px 0px" }}>
          Get our starter plan for getting small scale services
        </Typography>
        <Box>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "white" }} />{" "}
            Unlimited Customer
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "white" }} />{" "}
            Analytical reports
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "white" }} /> Chat
            Support
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "white" }} />{" "}
            Unlimited Emails
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "white" }} /> SEO
            Support
          </Typography>{" "}
          <Button
            onClick={async () => {
              const currentDate = new Date();
              const futureDate = new Date();
              futureDate.setMonth(currentDate.getMonth() + 4);
              setstatus({ ...status, popular: true });
              let payment = {
                amount: "20$",
                status: "pending",
                Date: currentDate,
                recepient: "Muhammad Danish",
                paymentMethod: "Stripe",
                BillingPlan: "Popular",
                nextpayment: futureDate,
                currentpayment: "20$",
                currentpaymentDate: currentDate,
                vendor: state?.userInfo?.user?._id,
              };
              let { data } = await axios.post("/api/updatepayment", payment);
              ctxDispatch({ type: "USER_SIGNIN", payload: data });
              localStorage.setItem("userInfo", JSON.stringify(data));
              const successUrl = "https://localhost:3000/checkout-success";

              window.location.href = `https://buy.stripe.com/test_3csg1D9FY2py0qk5kl?success_url=${encodeURIComponent(
                successUrl
              )}`;
              setstatus({ ...status, popular: false });
            }}
            sx={{
              color: "rgb(52,71,103)",
              background: "white",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margin: "10px 0px 10px 0px",
              border: "1px solid #c5b3b3b0",

              "&:hover": {
                background: "white",
              },
            }}
          >
            Choose Plan{" "}
            {status.popular && (
              <CircularProgress sx={{ ml: 1, color: "white" }} size='16px' />
            )}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "auto",
          marginRight: "7px",
          background: "white",
          width: { md: "280px", xs: "248px" },
          marginBottom: { md: "0px", xs: "14px" },

          transition: "0.3s ease-in",
          borderRadius: "15px",
          padding: "10px",
          flexDirection: "column",
          border: "1px solid #cbc0c0",
          boxShadow:
            "rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem, rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem",
          "&:hover": {
            transform: "scale(1.1)",
            // background:
            //   "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
            // color: "white",
          },
        }}
      >
        <Box sx={{ textAlign: "end" }}>
          {" "}
          <HelpOutlineIcon sx={{ color: "#8d8080ed" }} />
        </Box>
        <Typography sx={{ fontSize: "22px" }}>Enterprice</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "34px" }}>$50</span>
          <Typography
            sx={{ position: "relative", top: "6px", marginLeft: "4px" }}
          >
            / 6 MONTH
          </Typography>
        </Box>
        <Typography sx={{ margin: "10px 0px" }}>
          Get our starter plan for getting small scale services
        </Typography>
        <Box>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "#8d8080ed" }} />{" "}
            Unlimited Customer
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "#8d8080ed" }} />{" "}
            Analytical reports
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "#8d8080ed" }} /> Chat
            Support
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "#8d8080ed" }} />{" "}
            Unlimited Emails
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <TaskAltIcon sx={{ marginRight: "7px", color: "#8d8080ed" }} /> SEO
            Support
          </Typography>{" "}
          <Button
            onClick={async () => {
              const currentDate = new Date();
              const futureDate = new Date();
              futureDate.setMonth(currentDate.getMonth() + 6);
              setstatus({ ...status, enterprise: true });
              let payment = {
                amount: "50$",
                status: "pending",
                Date: currentDate,
                recepient: "Muhammad Danish",
                paymentMethod: "Stripe",
                BillingPlan: "Enterprise",
                nextpayment: futureDate,
                currentpayment: "50$",
                currentpaymentDate: currentDate,
                vendor: state?.userInfo?.user?._id,
              };

              let { data } = await axios.post("/api/updatepayment", payment);
              const successUrl = "https://localhost:3000/checkout-success";
              ctxDispatch({ type: "USER_SIGNIN", payload: data });
              localStorage.setItem("userInfo", JSON.stringify(data));
              window.location.href = `https://buy.stripe.com/test_4gwaHj9FYfckb4YbII?success_url=${encodeURIComponent(
                successUrl
              )}`;
            }}
            sx={{
              //   background: "white",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margin: "10px 0px 10px 0px",
              border: "1px solid #c5b3b3b0",
              background:
                "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
              color: "white",

              "&:hover": {
                background: "white",
                color: "rgb(52,71,103)",
              },
            }}
          >
            Choose Plan{" "}
            {status.enterprise && (
              <CircularProgress sx={{ ml: 1, color: "white" }} size='16px' />
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BillingPlan;
