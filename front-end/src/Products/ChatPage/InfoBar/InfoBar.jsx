import React from "react";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import CloseIcon from "@mui/icons-material/Close";
// import onlineIcon from '../../icons/onlineIcon.png';
// import closeIcon from '../../icons/closeIcon.png';

import "./InfoBar.css";

const InfoBar = ({ room }) => (
  <div className='infoBar'>
    <div className='leftInnerContainer'>
      {/* <img className='onlineIcon' alt='online icon' /> */}
      <OnlinePredictionIcon />
      <h3>{room}</h3>
    </div>
    <div className='rightInnerContainer'>
      <a href='/join'>
        <CloseIcon />
      </a>
    </div>
  </div>
);

export default InfoBar;
