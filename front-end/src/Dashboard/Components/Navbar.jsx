import { Box, Tooltip, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DehazeIcon from "@mui/icons-material/Dehaze";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import HomeIcon from "@mui/icons-material/Home";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DashboardGlobalContext,
  useDashboardContext,
} from "../Context/DashboardContext";

const Navbar = () => {
  const { navcontent, sidebar, setsidebar } = useContext(
    DashboardGlobalContext
  );
  const [DazeIconDisplay, newDazeIconDisplay] = useState("flex");
  const [MoveIconDisplay, newMoveIconDisplay] = useState("none");

  const DazebtnClicker = () => {
    // newdisplaySideBar("flex");
    newMoveIconDisplay("flex");
    setsidebar("block");

    newDazeIconDisplay("none");
  };

  const MorevertbtnClicker = () => {
    // newdisplaySideBar("none");
    newMoveIconDisplay("none");
    setsidebar("none");
    newDazeIconDisplay("flex");
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          border: "1px solid rgba(224,224, 224, 1)",
          padding: "8px 12px",
          alignItems: "center",
          margin: { md: "23px 33px", xs: "10px 5px" },
          marginTop: { md: "10px !important", xs: "13px" },

          width: { md: "76%", xs: "88%" },
          zIndex: "9",
          boxShadow:
            "rgba(255, 255, 255, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
          borderRadius: "0.75rem",
          position: "fixed",
          Zindex: "1200",
          backdropFilter: "saturate(200%) blur(0.875rem)",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          color: "rgb(52, 71, 103)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              dipslay: "flex",
              flexDirection: "row",
              alignItem: "center",
            }}
          >
            {/* <Typography sx={{ paddingTop: "10px" }}></Typography> */}
            <Typography sx={{ color: "rgb(0,0,0,0.6)", fontSize: "15px" }}>
              <HomeIcon
                sx={{
                  fontSize: "17px",
                  color: "rgb(0,0,0,0.6)",
                  position: "relative",
                  top: "3px",
                }}
              />{" "}
              / {navcontent}
            </Typography>
          </Box>
          <Typography
            sx={{
              // marginLeft: { md: "25px", sm: "10px" },
              fontSize: { md: "1rem", xs: "15px" },
            }}
          >
            {navcontent}
          </Typography>
        </Box>

        <Box
          sx={{
            flexDirection: { md: "row", xs: "column" },
            justifyContent: "space-between",
            display: { md: "flex", xs: "none" },
          }}
        >
          <Tooltip title='All News' arrow>
            <Typography
              sx={{
                paddingRight: "10px",
                fontSize: { md: "1rem", xs: "15px" },
              }}
            >
              <Link
                to='/userinfo'
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {" "}
                <FeedIcon />
              </Link>
            </Typography>
          </Tooltip>

          <Tooltip title='View Account' arrow>
            <Typography
              sx={{
                fontSize: { md: "1rem", xs: "15px" },
              }}
            >
              <Link
                to='/userinfo'
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {" "}
                <AccountCircleIcon />
              </Link>
            </Typography>
          </Tooltip>
        </Box>
        <Box sx={{ display: { md: "none", xs: "flex" } }}>
          <DehazeIcon
            onClick={DazebtnClicker}
            sx={{ display: DazeIconDisplay }}
          />
          <MoreVertIcon
            onClick={MorevertbtnClicker}
            sx={{ display: MoveIconDisplay }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
