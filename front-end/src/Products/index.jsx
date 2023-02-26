// import './App.css';
import { Routes, Route } from "react-router-dom";

import React, { Suspense } from "react";
import { LoadingBox } from "../Dashboard/Components";
import Cart from "./CartPage/Cart";
import Checkout from "./CheckoutPage/Checkout";
import Payment from "./PaymentPage/Payment";
import Home from "./HomePage/Home";
import ProductDetail from "./ProductDetail/Components/Screen";
import SigninInScreen from "../Auth/Login";
import SignupScreen from "../Auth/Register";
import CheckoutSuccess from "./PaymentPage/Components/CheckoutSuccess";
import NotFound from "../Components/NotFound";

const AllDetail = () => {
  return (
    <div className=''>
      <Suspense
        fallback={
          <div>
            <LoadingBox />
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productdetail/:id' element={<ProductDetail />} />
          <Route path='/cartpage' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/signin' element={<SigninInScreen />} />
          <Route path='/signup' element={<SignupScreen />} />
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AllDetail;
