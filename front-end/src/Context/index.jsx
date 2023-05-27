import { Box } from "@mui/material";
import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

export const GlobalContext = React.createContext();

const initialstate = {
  cart: {
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    cartid: localStorage.getItem("cartid")
      ? JSON.parse(localStorage.getItem("cartid"))
      : null,
    wishid: localStorage.getItem("wishid")
      ? JSON.parse(localStorage.getItem("wishid"))
      : null,
  },
  payments: localStorage.getItem("Payments")
    ? JSON.parse(localStorage.getItem("Payments"))
    : "",
  paymentMethod: localStorage.getItem("paymentMethod")
    ? localStorage.getItem("paymentMethod")
    : "",
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null,
  defaultAddress: localStorage.getItem("defaultAddress")
    ? JSON.parse(localStorage.getItem("defaultAddress"))
    : null,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      console.log(newItem);
      const existItem = state.cart.cartItem.find(
        (item) => item.productid === newItem.productid
      );
      const cartItem = existItem
        ? state.cart.cartItem.map((item) =>
            item.productid === existItem.productid ? newItem : item
          )
        : [...state.cart.cartItem, newItem];
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
      return { ...state, cart: { ...state.cart, cartItem } };
    case "CART_REMOVE_ITEM": {
      const cartItem = state.cart.cartItem.filter(
        (item) => item._id !== action.payload._id
      );
      return { ...state, cart: { ...state.cart, cartItem } };
    }
    case "CART_ID": {
      const cartid = action.payload.cartid;
      console.log(cartid);
      localStorage.setItem("cartid", JSON.stringify(cartid));
      return { ...state, cart: { ...state.cart, cartid } };
    }
    case "WISH_ID": {
      const wishid = action.payload.data;
      localStorage.setItem("wishid", JSON.stringify(wishid));
      return { ...state, cart: { ...state.cart, wishid } };
    }
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        shippingAddress: null,
        paymentMethod: null,
        cart: {
          cartItem: [],
          cartid: null,
          wishid: null,
        },
      };
    case "SAVE_SHIPPING_ADDRESS":
      localStorage.setItem("ShippingAddress", JSON.stringify(action.payload));
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case "SHIPPING_ADDRESS":
      localStorage.setItem("defaultAddress", JSON.stringify(action.payload));
      return {
        ...state,
        defaultAddress: action.payload,
      };
    case "Payments":
      localStorage.setItem("Payments", JSON.stringify(action.payload));
      return {
        ...state,
        payments: action.payload,
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
};

export const ContextState = ({ children }) => {
  const navigate = useNavigate();
  const [totalprice, settotalprice] = useState(0);
  const [navlistitems, setnavlistitems] = useState();

  // useEffect(() => {
  //   if (state?.userInfo?.user?.status === "vendor") {
  //     navigate("/sell");
  //   }
  // }, []);
  const [state, dispatch] = useReducer(reducer, initialstate);

  useEffect(() => {
    if (state?.userInfo?.user?.status === "vendor") {
      setnavlistitems([
        {
          title: "About",
          link: "/about",
          width: "42px",
          active: false,
        },
        {
          title: "Products",
          link: "/products",
          width: "65px",
          active: false,
        },

        {
          title: "Sell",
          link: "/sell",
          width: "28px",
          active: false,
        },
      ]);
    } else if (state?.userInfo?.user?.status === "user") {
      setnavlistitems([
        {
          title: "Home",
          link: "/",
          width: "38px",
          active: true,
        },
        {
          title: "About",
          link: "/about",
          width: "42px",
          active: false,
        },
        {
          title: "Products",
          link: "/products",
          width: "65px",
          active: false,
        },
        {
          title: "Categories",
          link: "",
          width: "73px",
          active: false,
        },
        {
          title: "Sell",
          link: "/sell",
          width: "28px",
          active: false,
        },
      ]);
    } else {
      setnavlistitems([
        {
          title: "Home",
          link: "/",
          width: "38px",
          active: true,
        },
        {
          title: "About",
          link: "/about",
          width: "42px",
          active: false,
        },
        {
          title: "Products",
          link: "/products",
          width: "65px",
          active: false,
        },
        {
          title: "Categories",
          link: "",
          width: "73px",
          active: false,
        },
        {
          title: "Sell",
          link: "/sell",
          width: "28px",
          active: false,
        },
      ]);
    }
  }, [state?.userInfo?.user]);

  const [allprice, setallprice] = useState({
    withdelivery: 0,
    withoutdelivery: 0,
    itemstotal: 0,
  });
  const [dashboardOpen, setdashboardOpen] = useState(false);
  const [buyNow, setbuyNow] = useState({});
  const [AddressBoxOpen, setAddressBoxOpen] = useState(false);
  const [switchbtn, setswitchbtn] = useState(0);
  const [AddressFormOpen, setAddressFormOpen] = useState(false);
  const [DefaultAddress, setDefaultAddress] = useState([]);
  const [addresslist, setaddresslist] = useState({});
  const [cartitems, setcartitems] = useState([]);
  const [adddress, setadddress] = useState({
    addresslist: {},
  });
  const [newAddress, setnewAddress] = useState(false);
  const [CheckVal, newCheckVal] = useState([]);
  const [quantity, setquantity] = useState(0);

  const fetchAddresses = async () => {
    // console.log("yes");
    const { data: data1 } = await axios.get(
      `/api/getaddresses/${state?.userInfo?.user?._id}`
    );
    // console.log(data1);
    let data = { success: true, addressId: data1[0]._id };
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        data,
      },
    });

    // });
    let defaultA = data1[0].addresslist.find((item) => {
      return (item.isDefault = true);
    });
    dispatch({
      type: "SHIPPING_ADDRESS",
      payload: {
        defaultA,
      },
    });
    setDefaultAddress(defaultA);
    setaddresslist(data1[0].addresslist);
  };

  const fetchcartItems = async () => {
    // console.log("yes");
    try {
      const { data } = await axios.get(
        `/api/allcartitems/${state.userInfo.user._id}`
      );
      // console.log(data[0]);
      if (data[0]) {
        let cartid = {
          success: true,
          cartId: data[0]._id,
        };
        dispatch({
          type: "CART_ID",
          payload: {
            cartid,
          },
        });
        // console.log(cartid);
        setcartitems(data[0].products);

        return data;
      } else {
      }
    } catch (error) {
      // console.log(error);
    }

    // console.log(data1);
    // let data = { success: true, addressId: data1[0]._id };
    // dispatch({
    //   type: "SAVE_SHIPPING_ADDRESS",
    //   payload: {
    //     data,
  };
  const SignOut = (vl) => {
    localStorage.removeItem("cartItem");
    localStorage.removeItem("cartid");
    localStorage.removeItem("wishid");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("ShippingAddress");
    localStorage.removeItem("paymentMethod");

    setcartitems([]);
    setDefaultAddress([]);
    setaddresslist({});
    dispatch({
      type: "USER_SIGNOUT",
    });
    if (vl === "sell") {
    } else {
      navigate("/signin");
    }
  };
  let jwtFromStorage = state?.userInfo?.token;

  if (jwtFromStorage) {
    const decodedToken = jwtDecode(jwtFromStorage);
    if (decodedToken.exp * 1000 < Date.now()) {
      SignOut();
    } else {
      // initialstate.user = decodedToken;
      // initialstate.token = jwtFromStorage.token;
    }
  }

  useEffect(() => {
    dispatch({
      type: "SHIPPING_ADDRESS",
      payload: {
        DefaultAddress,
      },
    });
  }, [DefaultAddress]);

  const setCartPrice = (cart) => {
    let tprice = 0;
    let withDeliveryCharges = 0;
    let alldelivery = 0;
    let itemstotal = 0;

    cart.map((item, i) => {
      tprice += item.product.price * item.quantity;
      withDeliveryCharges += item.product.price * item.quantity + 149;
      itemstotal += item.product.price * item.quantity;
      alldelivery += 149;
    });
    dispatch({
      type: "Payments",
      payload: {
        itemstotal: itemstotal,
        withdelivery: withDeliveryCharges,
        alldelivery: alldelivery,
      },
    });
    setallprice({
      ...allprice,
      itemstotal: itemstotal,
      withdelivery: withDeliveryCharges,
      alldelivery: alldelivery,
    });
    settotalprice(tprice);
  };

  return (
    <GlobalContext.Provider
      value={{
        addresslist,
        buyNow,
        setbuyNow,
        setaddresslist,
        cartitems,
        setcartitems,
        SignOut,
        allprice,
        adddress,
        setadddress,
        fetchcartItems,
        switchbtn,
        setswitchbtn,
        setallprice,
        setCartPrice,
        fetchAddresses,
        setnavlistitems,
        navlistitems,
        state,
        dispatch,
        dashboardOpen,
        setdashboardOpen,
        AddressBoxOpen,
        setAddressBoxOpen,
        AddressFormOpen,
        newAddress,
        setnewAddress,
        setAddressFormOpen,
        totalprice,
        quantity,
        setquantity,
        settotalprice,
        CheckVal,
        DefaultAddress,
        setDefaultAddress,
        newCheckVal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
