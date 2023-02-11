import { Box } from "@mui/material";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useEffect } from "react";

// import jwtDecode from "jwt-decode";

export const GlobalContext = React.createContext();

// let jwtFromStorage = localStorage.getItem("jwtToken");

// jwtFromStorage = JSON.parse(jwtFromStorage);
// // console.log(jwtFromStorage.user.role);
// if (jwtFromStorage) {
//   const decodedToken = jwtDecode(jwtFromStorage.token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem("jwtToken");
//   } else {
//     initialState.user = decodedToken;
//     initialState.token = jwtFromStorage.token;
//   }
// }

const initialstate = {
  cart: {
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    cartid: null,
  },
  paymentMethod: localStorage.getItem("paymentMethod")
    ? localStorage.getItem("paymentMethod")
    : "",
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItem.find(
        (item) => item.id === newItem.id
      );
      console.log(newItem);
      const cartItem = existItem
        ? state.cart.cartItem.map((item) =>
            item.id === existItem.id ? newItem : item
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
      const cartid = action.payload.data;
      return { ...state, cart: { ...state.cart, cartid } };
    }
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItem: [],
          shippingAddress: {},
          paymentMethod: "",
        },
      };
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
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
  const [state, dispatch] = useReducer(reducer, initialstate);
  const [dashboardOpen, setdashboardOpen] = useState(false);
  const [AddressBoxOpen, setAddressBoxOpen] = useState(false);
  const [AddressFormOpen, setAddressFormOpen] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        dashboardOpen,
        setdashboardOpen,
        AddressBoxOpen,
        setAddressBoxOpen,
        AddressFormOpen,
        setAddressFormOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
