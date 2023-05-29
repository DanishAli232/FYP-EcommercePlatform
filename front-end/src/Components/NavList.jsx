import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Scrollbars } from "react-custom-scrollbars-2";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { listVariants } from "../FramerMotion/motion";
import { GlobalContext } from "../Context";

const catlist = ["Shirts", "Shoes", "Accessories", "Hats", "Watches", "Others"];

const List = styled.li`
  padding: 10px;
  font-family: Roboto-Regular;
  font-size: 15px;
  color: #757575;
  cursor: pointer;
  transition: 0.4s ease-in;
  &:hover {
    background: #0000002e;
    color: black;
  }
`;
const NavList = ({ title, width, link, active, listClick }) => {
  const { setswitchbtn } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [open, setopen] = useState(active ? true : false);
  const [categoryOpen, setcategoryOpen] = useState(false);

  useEffect(() => {
    if (active) {
      setopen(true);
    } else {
      setopen(false);
    }
  }, [active]);

  const handleCategory = (item) => {
    window.location.href = `/products?category=${item}`;
  };

  return (
    <Box
      sx={title === "Categories" && { position: "relative", top: "-10px" }}
      onClick={() => {
        listClick(title);
        if (title !== "Categoies") {
          navigate(link);
        }
        if (title === "Products") {
          setswitchbtn(1);
        }
      }}
    >
      {" "}
      <motion.li
        style={active && title !== "Categories" && { color: "red" }}
        onClick={() => {
          title === "Categories" && setcategoryOpen(!categoryOpen);
        }}
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
        {title === "Categories" && !categoryOpen && (
          <ArrowDropDownIcon
            onClick={() => setcategoryOpen(!categoryOpen)}
            sx={{
              padding: "0px",
              margin: "0px",
              position: "relative",
              top: "6px",
            }}
          />
        )}
        {title === "Categories" && categoryOpen && (
          <ArrowDropUpIcon
            onClick={() => setcategoryOpen(!categoryOpen)}
            sx={{
              padding: "0px",
              margin: "0px",
              position: "relative",
              top: "6px",
            }}
          />
        )}
      </motion.li>
      <AnimatePresence initial={true}>
        {open && title !== "Categories" ? (
          <motion.div
            variants={listVariants(width)}
            style={
              // width: "38px",
              // active && {  }
              { height: "2px", background: "red" }
              // width: "10px",
            }
            // exit={{ width: "0px" }}
          ></motion.div>
        ) : null}
      </AnimatePresence>
      {title === "Categories" && categoryOpen && (
        <Box
          sx={{
            width: "200px",
            height: "224px",
            background: "#fdfdfd",
            border: "1px solid #0000000a",
            position: "fixed",
            top: "55px",
          }}
        >
          <Scrollbars>
            <ul
              style={{ listStyleType: "none", margin: "0px", padding: "0px" }}
            >
              {catlist.map((item) => (
                <List style={{}} onClick={() => handleCategory(item)}>
                  {item}
                </List>
              ))}
            </ul>
          </Scrollbars>
        </Box>
      )}
    </Box>
  );
};

export default NavList;
