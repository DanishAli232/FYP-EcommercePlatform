import React, { useContext } from "react";
import { GlobalContext } from "./Context";

import DashboardScreen from "./Dashboard/DashboardScreen";
import AllDetail from "./Products";

function App() {
  const { dashboardOpen } = useContext(GlobalContext);
  return (
    <div className='App'>
      <AllDetail />
      {dashboardOpen && <DashboardScreen />}
    </div>
  );
}

export default App;
