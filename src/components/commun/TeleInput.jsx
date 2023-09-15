import React, { useState } from "react";
import { Alert } from "@mui/material";
import "./teleInput.scss";

function TeleInput({ name, label, errorMessage }) {
  const [phone, setPhone] = useState("");
  const handlePhoneChange = (e) => {
    const regex = /^[0-9+ ]*$/;
    if (regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };
  return (
    <div className="user-phone">
      <input
        value={phone}
        type="text"
        name={name}
        required
        onChange={handlePhoneChange}
        onClick={() => setPhone("+212 ")}
      />
      <label>{label}</label>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </div>
  );
}

export default TeleInput;
