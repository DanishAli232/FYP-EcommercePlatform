import axios from "axios";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "./Context";

import DashboardScreen from "./Dashboard/DashboardScreen";
import AllDetail from "./Products";

function App() {
  const { dashboardOpen, state } = useContext(GlobalContext);
  const { userInfo } = state;
  axios.defaults.headers.common["Authorization"] = `Bearer ${userInfo.token}`;

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div className='App'>
      <AllDetail />
      {dashboardOpen && <DashboardScreen />}
    </div>
  );
}

export default App;
