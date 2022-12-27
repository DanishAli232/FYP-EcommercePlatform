// import './App.css';
import { Routes, Route } from "react-router-dom";

import React, { Suspense } from "react";
import { LoadingBox, Sidebar } from "./Components";
import Addproducts from "./Pages/AddProducts";

const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const AllUsers = React.lazy(() => import("./Pages/AllUsers"));
const Stores = React.lazy(() => import("./Pages/Stores"));
const ViewAccount = React.lazy(() => import("./Pages/ViewAccount"));

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
          {/* <Route path='/' element={<Addnews />} /> */}
          <Route path='/dashboard' element={<Dashboard />} />
          {/* <Route path='/addnews' element={<Addnews />} /> */}
          <Route path='/allusers' element={<AllUsers />} />
          <Route path='/stores' element={<Stores />} />
          <Route path='/viewaccount' element={<ViewAccount />} />
          <Route path='/addproduct' element={<Addproducts />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
