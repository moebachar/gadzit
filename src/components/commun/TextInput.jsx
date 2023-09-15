import React, { useState } from "react";
import "./textInput.scss";
import { Alert } from "@mui/material";

function TextInput({ name, label, errorMessage }) {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  console.log(value);
  return (
    <div className="user-info">
      <input
        value={value}
        type="text"
        name={name}
        required
        onChange={handleChange}
      />
      <label>{label}</label>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </div>
  );
}

export default TextInput;
