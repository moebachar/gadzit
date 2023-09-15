import React from "react";
import "./button2.scss";
function Button2({ type, label, onClick }) {
  return (
    <button className="button2" type={type || "button"} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button2;
