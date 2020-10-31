import React from "react";
import spinner from "../spinner.gif";

const Spinner = () => {
  return (
    <div style={{position: 'absolute', width: '100vw', height: '100vh'}}>
      <img
        src={spinner}
        style={{ position: 'relative', top: '30%', width: "100px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;
