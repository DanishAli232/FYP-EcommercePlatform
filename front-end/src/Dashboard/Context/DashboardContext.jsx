import { Box } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { GlobalContext } from "../../Context";

export const DashboardGlobalContext = React.createContext();

export const DashboardContext = ({ children }) => {
  const { state } = useContext(GlobalContext);
  const [navcontent, setnavcontent] = useState("Dashboard");
  const [statuscheck, setstatus] = useState(state?.userInfo?.user?.status);
  // const [statuscheck, setstatus] = useState("user");

  const [open1, setOpen] = React.useState(false);

  return (
    <DashboardGlobalContext.Provider
      value={{
        navcontent,
        setnavcontent,
        statuscheck,
        setstatus,
        setOpen,
        open1,
      }}
    >
      {children}
    </DashboardGlobalContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardGlobalContext);
