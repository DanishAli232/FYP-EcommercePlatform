// import './App.css';
import { Routes, Route } from "react-router-dom";

import React, { Suspense } from "react";
import Screen from "./ProductDetail/Components/Screen";
import { LoadingBox } from "../Dashboard/Components";
import Cart from "./CartPage/Cart";
import Checkout from "./CheckoutPage/Checkout";

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
          <Route path='/' element={<Screen />} />
          <Route path='/cartpage' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AllDetail;
