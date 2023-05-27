import { useContext } from "react";
import { DashboardGlobalContext } from "../Context/DashboardContext";

export const AllStyle = {
  sidebar1: {
    height: "95vh",
    color: "white",
    position: "fixed",
    background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
    padding: "10px",
    margin: "10px",
    borderRadius: "0.75rem",
    boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
    transition:
      "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    zIndex: "10",
    display: "none",
  },
};
