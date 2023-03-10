import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { listVariants } from "../FramerMotion/motion";

const NavList = ({ title, width, link, active, listClick }) => {
  const navigate = useNavigate();
  const [open, setopen] = useState(active ? true : false);

  return (
    <Box
      onClick={() => {
        listClick(title);
        navigate(link);
      }}
    >
      {" "}
      <motion.li
        style={active && { color: "red" }}
        onMouseOver={() => {
          setopen(true);
        }}
        onMouseLeave={() => {
          !active && setopen(false);
        }}
        className='liststyle'
        whileHover={{
          color: "red",
          // borderBottom: "2px solid red",
          transition: {
            //   yoyo: Infinity,
            duration: 0.5,
          },
        }}
      >
        {title}
      </motion.li>
      <AnimatePresence initial={true}>
        {open ? (
          <motion.div
            variants={listVariants(width)}
            style={{
              // width: "38px",
              // width: "10px",
              height: "2px",
              background: "red",
            }}
            // exit={{ width: "0px" }}
          ></motion.div>
        ) : null}
      </AnimatePresence>
    </Box>
  );
};

export default NavList;
