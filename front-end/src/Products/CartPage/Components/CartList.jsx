import { Button, Checkbox, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import Quantity from "../../../Components/Quantity";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { GlobalContext } from "../../../Context";
import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const CartList = ({
  name,
  image,
  storename,
  price,
  quantity,
  id,
  cartid,
  fetchData,
  CheckVal,
  newCheckVal,
  state,
  dispatch,
  setOpen,
  isChecked,
  setStatus,
  setmessage,
  handleClick,
}) => {
  const [wish, setwish] = useState(false);
  const [color, setcolor] = useState("#757575");
  const [qty, setqty] = useState(quantity);
  const fetchData1 = () => {
    fetchData();
  };

  const DeleteItem = async () => {
    const { data } = await axios.patch(
      `/api/deletecartitem?i=${id}&c=${cartid}`
    );
    if (data) {
      fetchData();
    }
  };

  const products = {
    productid: id,
    quantity: quantity,
    totalprice: price,
  };
  const _id = state.userInfo.user._id;
  const AddtoWishlist = async () => {
    setStatus("loading");
    if (wish) {
      console.log("yes1");
      try {
        const { data } = await axios.patch(
          `/api/deletewishitem?i=${id}&c=${state.cart.wishid.wishId}`
        );
        setStatus(null);
        setOpen(true);
        setwish(false);
        setmessage(data.message);
        setcolor("#757575");
      } catch (error) {
        setOpen(true);
        setmessage(error.message);
      }
    } else {
      if (state.cart.wishid) {
        console.log("yes2");
        try {
          const { data } = await axios.patch(
            `/api/updatewishitems/${state.cart.wishid.wishId}`,
            {
              products,
            }
          );
          console.log(data);

          setOpen(true);
          setStatus(null);
          setmessage(data.message);
          setwish(true);
          setcolor("red");
        } catch (error) {
          setOpen(true);
          setStatus(null);
          setmessage(error.message);
        }
      } else {
        console.log("yes3");
        try {
          const { data } = await axios.post("/api/addwishitems", {
            products,
            _id,
          });
          setOpen(true);
          setStatus(null);
          setwish(true);
          setmessage(data.message);
          setcolor("red");
          console.log(data);
          dispatch({
            type: "WISH_ID",
            payload: {
              data,
            },
          });
        } catch (error) {
          setStatus(null);
          setmessage(error.message);
          console.log(error);
        }
      }
    }
  };

  // const handleClick = (itemid) => {
  //   console.log(itemid);
  //   let position = CheckVal.indexOf(itemid) + 1;
  //   console.log(position);
  //   if (position === 0) {
  //     newCheckVal([...CheckVal, itemid]);
  //   } else {
  //     newCheckVal((prevdata) => {
  //       return prevdata.filter((filterval) => {
  //         return filterval !== itemid;
  //       });
  //     });
  //   }
  // };

  useEffect(() => {
    console.log(CheckVal);
  }, [CheckVal]);
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        marginTop: "15px",
        paddingY: "13px",
      }}
    >
      <Typography sx={{ paddingLeft: "13px" }}>{storename}</Typography>
      <div
        style={{
          width: "99%",
          border: "1px solid #b3afaf29",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      ></div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "400px",
            alignItems: "center",
          }}
        >
          <Checkbox
            checked={isChecked}
            onChange={handleClick}
            id={id}
            // onClick={() => {
            //   handleClick(id);
            // }}
          />
          <img style={{ width: "60px", height: "60px" }} src={image} alt='' />
          <Typography
            sx={{
              paddingLeft: "12px",
              fontSize: "14px",
              color: "#212121",
            }}
          >
            {name.length > 70 ? `${name.slice(0, 70)}...` : name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ color: " #f57224" }}>Rs. {price}</Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            <Tooltip title='Add to Wishlist' arrow>
              <Checkbox
                onClick={AddtoWishlist}
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                sx={{
                  color: color,
                  // fontSize: "22px",
                  // cursor: "pointer",
                  // "&:hover": {
                  //   color: "red",
                  // },
                }}
              />
              {/* <FavoriteBorderIcon
                onClick={AddtoWishlist}
                sx={{
                  color: color,
                  fontSize: "22px",
                  cursor: "pointer",
                  "&:hover": {
                    color: "red",
                  },
                }}
              /> */}
            </Tooltip>
            <Tooltip title='Delete' arrow>
              <Checkbox
                onClick={DeleteItem}
                {...label}
                icon={<DeleteOutlineOutlinedIcon />}
                checkedIcon={<DeleteOutlineOutlinedIcon />}
                sx={{
                  color: color,
                  // fontSize: "22px",
                  // cursor: "pointer",
                  // "&:hover": {
                  //   color: "red",
                  // },
                }}
              />
              {/* <DeleteOutlineOutlinedIcon
                onClick={DeleteItem}
                sx={{
                  color: "#757575",
                  paddingLeft: "8px",
                  fontSize: "24px",
                  cursor: "pointer",
                  "&:hover": {
                    color: "red",
                  },
                }}
              /> */}
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{ paddingRight: "12px" }}>
          <Quantity
            qty={qty}
            setqty={setqty}
            id={id}
            cartid={cartid}
            fetchData={fetchData1}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CartList;
