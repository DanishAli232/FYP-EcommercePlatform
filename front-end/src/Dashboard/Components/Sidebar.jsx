// import React, { useContext, useEffect, useState } from "react";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import { AllStyle } from "../Styles";
// import { Link } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ViewStreamIcon from "@mui/icons-material/ViewStream";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import FeedIcon from "@mui/icons-material/Feed";
// import PeopleIcon from "@mui/icons-material/People";
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
// import { DashboardGlobalContext } from "../Context/DashboardContext";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import Person4Icon from "@mui/icons-material/Person4";
// import LogoutIcon from "@mui/icons-material/Logout";
// import Alerts from "./Alert";
// import { GlobalContext } from "../../Context";

// const Sidebar = () => {
//   const { setdashboardOpen } = useContext(GlobalContext);
//   const { state } = useContext(GlobalContext);

//   const { setnavcontent, statuscheck, setOpen } = useContext(
//     DashboardGlobalContext
//   );
//   const [Dashboard, setDashboard] = useState({
//     "&:hover": {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//     },
//     backgroundColor: "rgba(0, 0, 0, 0.315)",
//     borderRadius: "0.75rem",
//   });

//   const [Viewaccount, setViewacoount] = useState({
//     "&:hover": {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//     },
//     backgroundColor: "",
//     borderRadius: "0.75rem",
//   });

//   const [Stores, setStores] = useState({
//     "&:hover": {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//     },
//     backgroundColor: "",
//     borderRadius: "0.75rem",
//   });

//   const [Addproduct, setAddproduct] = useState({
//     "&:hover": {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//     },
//     backgroundColor: "",
//     borderRadius: "0.75rem",
//   });

//   const [Allvendors, setAllvendors] = useState({
//     "&:hover": {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//     },
//     backgroundColor: "",
//     borderRadius: "0.75rem",
//   });

//   const [Allusers, setAllusers] = useState({
//     "&:hover": {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//     },
//     backgroundColor: "",
//     borderRadius: "0.75rem",
//   });

//   const [AllProduct, setAllProduct] = useState({
//     "&:hover": {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//     },
//     backgroundColor: "",
//     borderRadius: "0.75rem",
//   });

//   const [AllQuestion, setAllQuesion] = useState({
//     "&:hover": {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//     },
//     backgroundColor: "",
//     borderRadius: "0.75rem",
//   });

//   const [AllOrders, setAllOrders] = useState({
//     "&:hover": {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//     },
//     backgroundColor: "",
//     borderRadius: "0.75rem",
//   });

//   const [Wishlist, setWishlist] = useState({
//     "&:hover": {
//       backgroundColor: "rgba(255, 255, 255, 0.2)",
//     },
//     backgroundColor: "",
//     borderRadius: "0.75rem",
//   });
//   const DashboardClicker = () => {
//     setnavcontent("Dashboard");
//     setWishlist({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllOrders({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllQuesion({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setDashboard({
//       ...Dashboard,
//       backgroundColor: "rgba(0, 0, 0, 0.315)",
//     });
//     setStores({
//       ...Stores,
//       backgroundColor: "",
//     });
//     setViewacoount({
//       ...Viewaccount,
//       backgroundColor: "",
//     });
//     setAllusers({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAddproduct({
//       ...Addproduct,
//       backgroundColor: "",
//     });
//     setAllvendors({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAllProduct({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//   };

//   const LogoutClicker = () => {
//     setnavcontent("Dashboard");
//     setWishlist({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllOrders({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setOpen(true);
//     // alert("Do you Really want to Logout");
//     setAllQuesion({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setDashboard({
//       ...Dashboard,
//       backgroundColor: "rgba(0, 0, 0, 0.315)",
//     });
//     setStores({
//       ...Stores,
//       backgroundColor: "",
//     });
//     setViewacoount({
//       ...Viewaccount,
//       backgroundColor: "",
//     });
//     setAllusers({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAllvendors({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAllProduct({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAddproduct({
//       ...Addproduct,
//       backgroundColor: "",
//     });
//   };

//   const ViewAccountClicker = () => {
//     setnavcontent("View Account");
//     setWishlist({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllOrders({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllQuesion({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setDashboard({
//       ...Dashboard,
//       backgroundColor: "",
//     });
//     setAddproduct({
//       ...Addproduct,
//       backgroundColor: "",
//     });
//     setStores({
//       ...Stores,
//       backgroundColor: "",
//     });
//     setViewacoount({
//       ...Viewaccount,
//       backgroundColor: "rgba(0, 0, 0, 0.315)",
//     });
//     setAllusers({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAddproduct({
//       ...Addproduct,
//       backgroundColor: "",
//     });
//     setAllvendors({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAllProduct({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//   };

//   const AllusersClicker = () => {
//     setnavcontent("All Users");
//     setWishlist({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllOrders({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setDashboard({
//       ...Dashboard,
//       backgroundColor: "",
//     });
//     setStores({
//       ...Stores,
//       backgroundColor: "",
//     });
//     setViewacoount({
//       ...Viewaccount,
//       backgroundColor: "",
//     });
//     setAllusers({
//       ...Allusers,
//       backgroundColor: "rgba(0, 0, 0, 0.315)",
//     });
//     setAddproduct({
//       ...Addproduct,
//       backgroundColor: "",
//     });
//     setAllvendors({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAllProduct({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//   };

//   const AllvendorsClicker = () => {
//     setnavcontent("All Vendors");
//     setWishlist({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllOrders({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setDashboard({
//       ...Dashboard,
//       backgroundColor: "",
//     });
//     setStores({
//       ...Stores,
//       backgroundColor: "",
//     });
//     setViewacoount({
//       ...Viewaccount,
//       backgroundColor: "",
//     });
//     setAllusers({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAddproduct({
//       ...Addproduct,
//       backgroundColor: "",
//     });
//     setAllvendors({
//       ...Allusers,
//       backgroundColor: "rgba(0, 0, 0, 0.315)",
//     });
//     setAllProduct({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//   };

//   const AddproductClicker = () => {
//     setnavcontent("Add Product");
//     setWishlist({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllOrders({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllQuesion({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setDashboard({
//       ...Dashboard,
//       backgroundColor: "",
//     });
//     setStores({
//       ...Stores,
//       backgroundColor: "",
//     });
//     setViewacoount({
//       ...Viewaccount,
//       backgroundColor: "",
//     });
//     setAllusers({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAllvendors({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAddproduct({
//       ...Addproduct,
//       backgroundColor: "rgba(0, 0, 0, 0.315)",
//     });

//     setAllProduct({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//   };

//   const AllproductClicker = () => {
//     setnavcontent("All Products");
//     setWishlist({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllOrders({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllQuesion({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setDashboard({
//       ...Dashboard,
//       backgroundColor: "",
//     });
//     setStores({
//       ...Stores,
//       backgroundColor: "",
//     });
//     setViewacoount({
//       ...Viewaccount,
//       backgroundColor: "",
//     });
//     setAllusers({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAllvendors({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAddproduct({
//       ...Addproduct,
//       backgroundColor: "",
//     });

//     setAllProduct({
//       ...AllProduct,
//       backgroundColor: "rgba(0, 0, 0, 0.315)",
//     });
//   };

//   const AllQuestionClicker = () => {
//     setnavcontent("All Questions");
//     setDashboard({
//       ...Dashboard,
//       backgroundColor: "",
//     });
//     setStores({
//       ...Stores,
//       backgroundColor: "",
//     });
//     setViewacoount({
//       ...Viewaccount,
//       backgroundColor: "",
//     });
//     setAllusers({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAllvendors({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAddproduct({
//       ...Addproduct,
//       backgroundColor: "",
//     });

//     setAllProduct({
//       ...AllProduct,
//       backgroundColor: "",
//     });

//     setAllQuesion({
//       ...AllProduct,
//       backgroundColor: "rgba(0, 0, 0, 0.315)",
//     });
//     setWishlist({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllOrders({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//   };

//   const WishlistClicker = () => {
//     setnavcontent("Wishlist");
//     setDashboard({
//       ...Dashboard,
//       backgroundColor: "",
//     });
//     setStores({
//       ...Stores,
//       backgroundColor: "",
//     });
//     setViewacoount({
//       ...Viewaccount,
//       backgroundColor: "",
//     });
//     setAllusers({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAllvendors({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAddproduct({
//       ...Addproduct,
//       backgroundColor: "",
//     });

//     setAllProduct({
//       ...AllProduct,
//       backgroundColor: "",
//     });

//     setAllQuesion({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setWishlist({
//       ...AllProduct,
//       backgroundColor: "rgba(0, 0, 0, 0.315)",
//     });
//     setAllOrders({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//   };

//   const OrdersClicker = () => {
//     setnavcontent("Orders");
//     setDashboard({
//       ...Dashboard,
//       backgroundColor: "",
//     });
//     setStores({
//       ...Stores,
//       backgroundColor: "",
//     });
//     setViewacoount({
//       ...Viewaccount,
//       backgroundColor: "",
//     });
//     setAllusers({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAllvendors({
//       ...Allusers,
//       backgroundColor: "",
//     });
//     setAddproduct({
//       ...Addproduct,
//       backgroundColor: "",
//     });

//     setAllProduct({
//       ...AllProduct,
//       backgroundColor: "",
//     });

//     setAllQuesion({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setWishlist({
//       ...AllProduct,
//       backgroundColor: "",
//     });
//     setAllOrders({
//       ...AllProduct,
//       backgroundColor: "rgba(0, 0, 0, 0.315)",
//     });
//   };

//   useEffect(() => {
//     console.log(Dashboard);
//     console.log(statuscheck);
//   }, [Dashboard, statuscheck]);

//   return (
//     <Box sx={AllStyle.sidebar1}>
//       <nav aria-label='secondary mailbox folders'>
//         {/* <Alerts /> */}
//         <List>
//           <Link
//             to='/'
//             style={{ textDecoration: "none", color: "white" }}
//             onClick={() => {
//               setdashboardOpen(false);
//             }}
//           >
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemText
//                   primary='ARSTORE'
//                   sx={{ textAlign: "center", fontSize: "27px" }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           </Link>
//         </List>
//       </nav>
//       <hr />
//       {/* <Divider /> */}
//       <nav aria-label='main mailbox folders'>
//         <>
//           {state?.userInfo?.user?.status === "admin" && (
//             <List>
//               <Link
//                 to='/dashboard'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Dashboard} onClick={DashboardClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <DashboardIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='Dashboard'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               <Link
//                 to='/viewaccount'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Viewaccount} onClick={ViewAccountClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <AccountCircleIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='View Account'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               {/* <Link
//                 to='/stores'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   // onClick={newsClicker}
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                     "&:hover": {},
//                   }}
//                 >
//                   <ListItemButton sx={Stores} onClick={LogoutClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <FeedIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='Stores'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link> */}

//               <Link
//                 to='/allproducts'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   // onClick={newsClicker}
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                     "&:hover": {},
//                   }}
//                 >
//                   <ListItemButton sx={AllProduct} onClick={AllproductClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <FeedIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='All Products'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>

//               <Link
//                 to='/allvendors'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Allvendors} onClick={AllvendorsClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <Person4Icon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='All Vendors'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               <Link
//                 to='/allusers'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Allusers} onClick={AllusersClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <PeopleIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='All Users'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>

//               <Link
//                 to='/addproduct'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Addproduct} onClick={AddproductClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <UploadFileIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='Add Product'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>

//               <Link
//                 to='/dashboard'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Stores} onClick={LogoutClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <LogoutIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='Logout'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//             </List>
//           )}
//           {state?.userInfo?.user?.status === "vendor" && (
//             <List>
//               <Link
//                 to='/dashboard'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Dashboard} onClick={DashboardClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <DashboardIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='Dashboard'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               <Link
//                 to='/viewaccount'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Viewaccount} onClick={ViewAccountClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <AccountCircleIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='View Account'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>

//               <Link
//                 to='/allproducts'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   // onClick={newsClicker}
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                     "&:hover": {},
//                   }}
//                 >
//                   <ListItemButton sx={AllProduct} onClick={AllproductClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <FeedIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='All Products'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>

//               <Link
//                 to='/allquestions'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   // onClick={newsClicker}
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                     "&:hover": {},
//                   }}
//                 >
//                   <ListItemButton sx={AllQuestion} onClick={AllQuestionClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <QuestionAnswerIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='All Questions'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               <Link
//                 to='/chatvendor'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Dashboard} onClick={DashboardClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <DashboardIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='Chat'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               <Link
//                 to='/addproduct'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Addproduct} onClick={AddproductClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <UploadFileIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='Add Product'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               <Link
//                 to='/dashboard'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Stores} onClick={LogoutClicker}>
//                     <ListItemIcon sx={{ color: "white", marginLeft: "4px" }}>
//                       <LogoutIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='Logout'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//             </List>
//           )}
//           {state?.userInfo?.user?.status === "user" && (
//             <List>
//               <Link
//                 to='/viewaccount'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Viewaccount} onClick={ViewAccountClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <AccountCircleIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='View Account'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               <Link
//                 to='/orders'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={AllOrders} onClick={OrdersClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <ViewStreamIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='Orders'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               <Link
//                 to='/wishlist'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Wishlist} onClick={WishlistClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <FavoriteBorderIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='Wishlists'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//               <Link
//                 to='/dashboard'
//                 style={{ textDecoration: "none", width: "88%" }}
//               >
//                 <ListItem
//                   disablePadding
//                   sx={{
//                     transition:
//                       "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//                   }}
//                 >
//                   <ListItemButton sx={Stores} onClick={LogoutClicker}>
//                     <ListItemIcon sx={{ color: "white" }}>
//                       <LogoutIcon />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary='Logout'
//                       sx={{ color: "white", textDecoration: "none" }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>
//             </List>
//           )}
//         </>
//       </nav>
//     </Box>
//   );
// };

// export default Sidebar;
