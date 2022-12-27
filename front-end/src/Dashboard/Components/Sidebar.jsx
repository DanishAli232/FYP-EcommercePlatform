import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AllStyle } from "../Styles";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import PeopleIcon from "@mui/icons-material/People";
import { DashboardGlobalContext } from "../Context/DashboardContext";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Sidebar = () => {
  const { setnavcontent } = useContext(DashboardGlobalContext);
  const [Dashboard, setDashboard] = useState({
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    backgroundColor: "rgba(0, 0, 0, 0.315)",
    borderRadius: "0.75rem",
  });

  const [Viewaccount, setViewacoount] = useState({
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    backgroundColor: "",
    borderRadius: "0.75rem",
  });

  const [Stores, setStores] = useState({
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    backgroundColor: "",
    borderRadius: "0.75rem",
  });

  const [Addproduct, setAddproduct] = useState({
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    backgroundColor: "",
    borderRadius: "0.75rem",
  });

  const [Allusers, setAllusers] = useState({
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    backgroundColor: "",
    borderRadius: "0.75rem",
  });

  const DashboardClicker = () => {
    setnavcontent("Dashboard");
    setDashboard({
      ...Dashboard,
      backgroundColor: "rgba(0, 0, 0, 0.315)",
    });
    setStores({
      ...Stores,
      backgroundColor: "",
    });
    setViewacoount({
      ...Viewaccount,
      backgroundColor: "",
    });
    setAllusers({
      ...Allusers,
      backgroundColor: "",
    });
    setAddproduct({
      ...Addproduct,
      backgroundColor: "",
    });
  };

  const StoreClicker = () => {
    setnavcontent("Stores");

    setDashboard({
      ...Dashboard,
      backgroundColor: "",
    });
    setStores({
      ...Stores,
      backgroundColor: "rgba(0, 0, 0, 0.315)",
    });
    setViewacoount({
      ...Viewaccount,
      backgroundColor: "",
    });
    setAllusers({
      ...Allusers,
      backgroundColor: "",
    });
  };

  const ViewAccountClicker = () => {
    setnavcontent("View Account");
    setDashboard({
      ...Dashboard,
      backgroundColor: "",
    });
    setStores({
      ...Stores,
      backgroundColor: "",
    });
    setViewacoount({
      ...Viewaccount,
      backgroundColor: "rgba(0, 0, 0, 0.315)",
    });
    setAllusers({
      ...Allusers,
      backgroundColor: "",
    });
    setAddproduct({
      ...Addproduct,
      backgroundColor: "",
    });
  };

  const AllusersClicker = () => {
    setnavcontent("All Users");
    setDashboard({
      ...Dashboard,
      backgroundColor: "",
    });
    setStores({
      ...Stores,
      backgroundColor: "",
    });
    setViewacoount({
      ...Viewaccount,
      backgroundColor: "",
    });
    setAllusers({
      ...Allusers,
      backgroundColor: "rgba(0, 0, 0, 0.315)",
    });
    setAddproduct({
      ...Addproduct,
      backgroundColor: "",
    });
  };

  const AddproductClicker = () => {
    setnavcontent("Add Product");
    setDashboard({
      ...Dashboard,
      backgroundColor: "",
    });
    setStores({
      ...Stores,
      backgroundColor: "",
    });
    setViewacoount({
      ...Viewaccount,
      backgroundColor: "",
    });
    setAllusers({
      ...Allusers,
      backgroundColor: "",
    });

    setAddproduct({
      ...Addproduct,
      backgroundColor: "rgba(0, 0, 0, 0.315)",
    });
  };

  useEffect(() => {
    console.log(Dashboard);
  }, [Dashboard]);

  return (
    <Box sx={AllStyle.sidebar1}>
      <nav aria-label='secondary mailbox folders'>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary='ARSTORE'
                sx={{ textAlign: "center", fontSize: "27px" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <hr />
      {/* <Divider /> */}
      <nav aria-label='main mailbox folders'>
        <List>
          <Link
            to='/dashboard'
            style={{ textDecoration: "none", width: "88%" }}
          >
            <ListItem
              disablePadding
              sx={{
                transition:
                  "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              }}
            >
              <ListItemButton sx={Dashboard} onClick={DashboardClicker}>
                <ListItemIcon sx={{ color: "white" }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary='Dashboard'
                  sx={{ color: "white", textDecoration: "none" }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to='/viewaccount'
            style={{ textDecoration: "none", width: "88%" }}
          >
            <ListItem
              disablePadding
              sx={{
                transition:
                  "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              }}
            >
              <ListItemButton sx={Viewaccount} onClick={ViewAccountClicker}>
                <ListItemIcon sx={{ color: "white" }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary='View Account'
                  sx={{ color: "white", textDecoration: "none" }}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to='/stores' style={{ textDecoration: "none", width: "88%" }}>
            <ListItem
              // onClick={newsClicker}
              disablePadding
              sx={{
                transition:
                  "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                "&:hover": {},
              }}
            >
              <ListItemButton sx={Stores} onClick={StoreClicker}>
                <ListItemIcon sx={{ color: "white" }}>
                  <FeedIcon />
                </ListItemIcon>
                <ListItemText
                  primary='Stores'
                  sx={{ color: "white", textDecoration: "none" }}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to='/allusers' style={{ textDecoration: "none", width: "88%" }}>
            <ListItem
              disablePadding
              sx={{
                transition:
                  "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              }}
            >
              <ListItemButton sx={Allusers} onClick={AllusersClicker}>
                <ListItemIcon sx={{ color: "white" }}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary='All Users'
                  sx={{ color: "white", textDecoration: "none" }}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            to='/addproduct'
            style={{ textDecoration: "none", width: "88%" }}
          >
            <ListItem
              disablePadding
              sx={{
                transition:
                  "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              }}
            >
              <ListItemButton sx={Addproduct} onClick={AddproductClicker}>
                <ListItemIcon sx={{ color: "white" }}>
                  <UploadFileIcon />
                </ListItemIcon>
                <ListItemText
                  primary='Add Product'
                  sx={{ color: "white", textDecoration: "none" }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </nav>
    </Box>
  );
};

export default Sidebar;
