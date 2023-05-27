import axios from "axios";
import React, { Suspense, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// import ConfirmEmail from "./Auth/ConfirmEmail";
// import EmailConfirmation from "./Auth/EmailConfirmation";
// import SignupScreen from "./Auth/Login";
import LoadingBox from "./Components/LoadingBox";
import NotFound from "./Components/NotFound";
import { GlobalContext } from "./Context";
import { Sidebar } from "./Dashboard/Components";
import ForgotPassword from "./Auth/ForgotPassword";
import ChangePassword from "./Auth/ChangePassword";
import Chat from "./Products/ChatPage/Chat/Chat.jsx";
import Join from "./Products/ChatPage/Join/Join";
import ChatVendor from "./Dashboard/Pages/Chat";
import Sidebar1 from "./Dashboard/Components/Sidebar1";
import Coupons from "./Dashboard/Pages/Coupons";
import Reviews from "./Dashboard/Pages/Reviews";
import CameraOverlay from "./Products/ProductDetail/Components/AR";

const Home1 = React.lazy(() => import("./Products/HomePage/Home1"));
const AllQuestions = React.lazy(() => import("./Dashboard/Pages/AllQuestions"));
const Sell = React.lazy(() => import("./Auth/Sell"));
const VendorLogin = React.lazy(() => import("./Auth/vendorlogin"));
const About = React.lazy(() => import("./Products/AboutPage/About"));
const SignupScreen = React.lazy(() => import("./Auth/Register"));
const SigninScreen = React.lazy(() => import("./Auth/Login"));
const ConfirmEmail = React.lazy(() => import("./Auth/ConfirmEmail"));
const EmailConfirmation = React.lazy(() => import("./Auth/EmailConfirmation"));
const Dashboard = React.lazy(() => import("./Dashboard/Pages/Dashboard"));
const Payment = React.lazy(() => import("./Products/PaymentPage/Payment"));
const Addproducts = React.lazy(() => import("./Dashboard/Pages/AddProducts"));
const Cart = React.lazy(() => import("./Products/CartPage/Cart"));
const Checkout = React.lazy(() => import("./Products/CheckoutPage/Checkout"));
const CheckoutSuccess = React.lazy(() =>
  import("./Products/PaymentPage/Components/CheckoutSuccess")
);
const ProductDetail = React.lazy(() =>
  import("./Products/ProductDetail/Components/Screen")
);
const ProductsPage = React.lazy(() =>
  import("./Products/ProductsPage/ProductsPage")
);
const AllUsers = React.lazy(() => import("./Dashboard/Pages/AllUsers"));
const Orders = React.lazy(() => import("./Dashboard/Pages/Orders"));
const Wishlist = React.lazy(() => import("./Dashboard/Pages/Wishlist"));
const Stores = React.lazy(() => import("./Dashboard/Pages/Stores"));
const ViewAccount = React.lazy(() => import("./Dashboard/Pages/ViewAccount"));
const AllVendors = React.lazy(() => import("./Dashboard/Pages/AllVendors"));
const AllProducts = React.lazy(() => import("./Dashboard/Pages/AllProducts"));
const Updateproduct = React.lazy(() =>
  import("./Dashboard/Pages/Updateproduct")
);

function App() {
  const { dashboardOpen, state } = useContext(GlobalContext);
  const { userInfo } = state;
  if (userInfo) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${userInfo.token}`;
  }

  useEffect(() => {
    // console.log(state);
  }, [state]);
  return (
    <div className='App'>
      <Suspense
        fallback={
          <div>
            <LoadingBox />
          </div>
        }
      >
        {/* {dashboardOpen && <Sidebar />} */}
        {dashboardOpen && <Sidebar1 />}

        <Routes>
          {state?.userInfo?.user?.status === "vendor" ? (
            <>
              <Route path='/' element={<ProductsPage />} />
              <Route
                path='/emailconfirmation'
                element={<EmailConfirmation />}
              />
              <Route path='/products' element={<ProductsPage />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/coupons' element={<Coupons />} />
              <Route path='/viewaccount' element={<ViewAccount />} />
              <Route path='/addproduct' element={<Addproducts />} />
              <Route path='/allproducts' element={<AllProducts />} />
              <Route path='/updateproduct/:id' element={<Updateproduct />} />
              <Route path='/sell' element={<Sell />} />
              <Route path='/about' element={<About />} />
              <Route path='/join' element={<Join />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/vendorlogin' element={<VendorLogin />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/allquestions' element={<AllQuestions />} />
              <Route path='/chatvendor' element={<ChatVendor />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/checkout-success' element={<CheckoutSuccess />} />
              <Route
                path='/email/:id/verify/:token'
                element={<ConfirmEmail />}
              />
              <Route path='/changepassword/:id' element={<ChangePassword />} />
              <Route path='/confirmemail' element={<ConfirmEmail />} />
              <Route
                path='/emailconfirmation'
                element={<EmailConfirmation />}
              />
            </>
          ) : state?.userInfo?.user?.status === "admin" ? (
            <>
              <Route path='/' element={<Dashboard />} />
              {/* <Route path='/' element={<Home1 />} />
              <Route path='/productdetail/:id' element={<ProductDetail />} /> */}
              {/* <Route path='/about' element={<About />} /> */}
              {/* <Route path='/join' element={<Join />} /> */}
              {/* <Route path='/chat' element={<Chat />} /> */}
              {/* <Route path='/vendorlogin' element={<VendorLogin />} /> */}
              {/* <Route path='/wishlist' element={<Wishlist />} /> */}
              <Route path='/orders' element={<Orders />} />
              <Route path='/allquestions' element={<AllQuestions />} />
              {/* <Route path='/chatvendor' element={<ChatVendor />} /> */}
              {/* <Route path='/cartpage' element={<Cart />} /> */}
              {/* <Route path='/checkout' element={<Checkout />} /> */}
              {/* <Route path='/payment' element={<Payment />} /> */}
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              {/* <Route path='/checkout-success' element={<CheckoutSuccess />} /> */}
              {/* <Route
                path='/email/:id/verify/:token'
                element={<ConfirmEmail />}
              />
              <Route
                path='/forgotpassword/:id/verify/:token'
                element={<ForgotPassword />}
              /> */}
              {/* <Route path='/changepassword/:id' element={<ChangePassword />} /> */}
              {/* <Route path='/confirmemail' element={<ConfirmEmail />} /> */}
              {/* <Route
                path='/emailconfirmation'
                element={<EmailConfirmation />}
              /> */}
              {/* <Route path='/products' element={<ProductsPage />} /> */}
              <Route path='/dashboard' element={<Dashboard />} />
              {/* <Route path='/coupons' element={<Coupons />} /> */}
              <Route path='/allusers' element={<AllUsers />} />
              <Route path='/stores' element={<Stores />} />
              <Route path='/viewaccount' element={<ViewAccount />} />
              <Route path='/addproduct' element={<Addproducts />} />
              <Route path='/allvendors' element={<AllVendors />} />
              <Route path='/allproducts' element={<AllProducts />} />
              <Route path='/updateproduct/:id' element={<Updateproduct />} />
              {/* <Route path='/sell' element={<Sell />} /> */}
            </>
          ) : (
            <>
              <Route path='/' element={<Home1 />} />
              <Route path='/productdetail/:id' element={<ProductDetail />} />
              <Route path='/about' element={<About />} />
              <Route path='/reviews' element={<Reviews />} />
              <Route path='/join' element={<Join />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/vendorlogin' element={<VendorLogin />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/allquestions' element={<AllQuestions />} />
              <Route path='/chatvendor' element={<ChatVendor />} />
              <Route path='/cartpage' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/checkout-success' element={<CheckoutSuccess />} />
              <Route
                path='/email/:id/verify/:token'
                element={<ConfirmEmail />}
              />
              <Route
                path='/forgotpassword/:id/verify/:token'
                element={<ForgotPassword />}
              />
              <Route path='/changepassword/:id' element={<ChangePassword />} />
              {/* <Route path='/confirmemail' element={<ConfirmEmail />} /> */}
              <Route
                path='/emailconfirmation'
                element={<EmailConfirmation />}
              />
              <Route path='/products' element={<ProductsPage />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/coupons' element={<Coupons />} />
              <Route path='/allusers' element={<AllUsers />} />
              <Route path='/stores' element={<Stores />} />
              <Route path='/viewaccount' element={<ViewAccount />} />
              <Route path='/addproduct' element={<Addproducts />} />
              <Route path='/allvendors' element={<AllVendors />} />
              <Route path='/allproducts' element={<AllProducts />} />
              <Route path='/updateproduct/:id' element={<Updateproduct />} />
              <Route path='/sell' element={<Sell />} />
            </>
          )}
          <Route path='/camera' element={<CameraOverlay />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      {/* <AllDetail />
      <DashboardScreen /> */}
    </div>
  );
}

export default App;
