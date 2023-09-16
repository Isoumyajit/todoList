import React from "react";
import "../../CSS/loader-screen.css";
const LoadingScreen = () => {
  return (
    <>
      <div className="lds-ellipsis relative items-center justify-center z-10">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default LoadingScreen;
