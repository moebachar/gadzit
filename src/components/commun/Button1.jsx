import React from "react";
import "./button1.scss";

function Button1({ type, label, onClick }) {
  return (
    <button className="button1" type={type || "button"} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button1;
