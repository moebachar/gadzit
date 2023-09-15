import React, { useState } from "react";
import "./selectInput.scss";

function SelectInput({ options, placeHolder }) {
  const [value, setValue] = useState("");
  return (
    <div className="user-select">
      <select
        name="pets"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="">{placeHolder}</option>
        {options.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
