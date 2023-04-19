import { Box, Button, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React from "react";

const BillingPlan = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
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
          width: "280px",
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
          <a href='https://buy.stripe.com/test_3cs02F4lEaW44GA8wy'>
            <Button
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
              Choose Plan
            </Button>
          </a>
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
          width: "280px",
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
          </Typography>
          <a href='https://buy.stripe.com/test_3csg1D9FY2py0qk5kl'>
            {" "}
            <Button
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
              Choose Plan
            </Button>
          </a>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "auto",
          marginRight: "7px",
          background: "white",
          width: "280px",
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
          <a href='https://buy.stripe.com/test_4gwaHj9FYfckb4YbII'>
            {" "}
            <Button
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
              Choose Plan
            </Button>
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default BillingPlan;