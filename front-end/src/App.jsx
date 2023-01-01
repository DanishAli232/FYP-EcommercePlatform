// import './App.css';
import { Routes, Route } from "react-router-dom";

import React, { Suspense } from "react";
import { LoadingBox, Sidebar } from "./Dashboard/Components";
import Addproducts from "./Dashboard/Pages/AddProducts";
import Updateproduct from "./Dashboard/Pages/Updateproduct";

const Dashboard = React.lazy(() => import("./Dashboard/Pages/Dashboard"));
const AllUsers = React.lazy(() => import("./Dashboard/Pages/AllUsers"));
const Stores = React.lazy(() => import("./Dashboard/Pages/Stores"));
const ViewAccount = React.lazy(() => import("./Dashboard/Pages/ViewAccount"));
const AllVendors = React.lazy(() => import("./Dashboard/Pages/AllVendors"));
const AllProducts = React.lazy(() => import("./Dashboard/Pages/AllProducts"));

function App() {
  return (
    <div className='App'>
      <Suspense
        fallback={
          <div>
            <LoadingBox />
          </div>
        }
      >
        <Sidebar />
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
}

export default App;
