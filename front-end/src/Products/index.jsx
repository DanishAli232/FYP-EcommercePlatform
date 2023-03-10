// import './App.css';
import { Routes, Route } from "react-router-dom";

import React, { Suspense, useContext } from "react";
import { LoadingBox } from "../Dashboard/Components";
import Cart from "./CartPage/Cart";
import Checkout from "./CheckoutPage/Checkout";
import Payment from "./PaymentPage/Payment";
import ProductDetail from "./ProductDetail/Components/Screen";
import SigninInScreen from "../Auth/Login";
import SignupScreen from "../Auth/Register";
import CheckoutSuccess from "./PaymentPage/Components/CheckoutSuccess";
import NotFound from "../Components/NotFound";
import ConfirmEmail from "../Auth/ConfirmEmail";
import EmailConfirmation from "../Auth/EmailConfirmation";
import Home1 from "./HomePage/Home1";
import { GlobalContext } from "../Context";
import ProductsPage from "./ProductsPage/ProductsPage";

const AllDetail = () => {
  const { dashboardOpen } = useContext(GlobalContext);

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
          <Route path='/' element={<Home1 />} />
          <Route path='/productdetail/:id' element={<ProductDetail />} />
          <Route path='/cartpage' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/signin' element={<SigninInScreen />} />
          <Route path='/signup' element={<SignupScreen />} />
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          {/* <Route path='/email/:id/verify/:token' element={<ConfirmEmail />} /> */}
          <Route path='/confirmemail' element={<ConfirmEmail />} />
          <Route path='/emailconfirmation' element={<EmailConfirmation />} />
          {/* <Route path='/home1' element={<Home1 />} /> */}
          <Route path='/products' element={<ProductsPage />} />
          {dashboardOpen === false && <Route path='*' element={<NotFound />} />}
        </Routes>
      </Suspense>
    </div>
  );
};

export default AllDetail;
