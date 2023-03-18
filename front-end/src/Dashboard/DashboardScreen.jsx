// import './App.css';
import { Routes, Route } from "react-router-dom";

import React, { Suspense } from "react";
import { LoadingBox, Sidebar } from "./Components";
import Addproducts from "./Pages/AddProducts";
import Updateproduct from "./Pages/Updateproduct";

const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const AllQuestions = React.lazy(() => import("./Pages/AllQuestions"));
const AllUsers = React.lazy(() => import("./Pages/AllUsers"));
const Stores = React.lazy(() => import("./Pages/Stores"));
const ViewAccount = React.lazy(() => import("./Pages/ViewAccount"));
const AllVendors = React.lazy(() => import("./Pages/AllVendors"));
const AllProducts = React.lazy(() => import("./Pages/AllProducts"));
const DashboardScreen = () => {
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
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/allusers' element={<AllUsers />} />
          <Route path='/stores' element={<Stores />} />
          <Route path='/viewaccount' element={<ViewAccount />} />
          <Route path='/addproduct' element={<Addproducts />} />
          <Route path='/allvendors' element={<AllVendors />} />
          <Route path='/allproducts' element={<AllProducts />} />
          <Route path='/updateproduct/:id' element={<Updateproduct />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default DashboardScreen;
