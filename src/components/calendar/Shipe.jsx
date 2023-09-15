import React from "react";
import "./shipe.scss";
function Shipe({ type, title }) {
  return (
    <div className="shipe" id={type}>
      <span>{`${type}: ${title}`}</span>
    </div>
  );
}

export default Shipe;
