import React, { useEffect, useState } from "react";
import "./workshopsFram.css";
import { getLogos } from "./fakeServices";
import { useNavigate } from "react-router-dom";

function WorkshopsFram() {
  const [logos, setLogos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLogos(getLogos());
  }, []);
  return (
    <fieldset className="wfieldset" id="workshops">
      <legend className="title">Workshops</legend>
      <div className="logo-row">
        {logos.map((image) => (
          <img
            key={image}
            src={require(`../../assets/logo/${image}.ico`)}
            alt="img"
          />
        ))}
      </div>
      <button
        className="apply-btn"
        onClick={() => navigate("/workshops-order")}
      >
        Apply!
      </button>
    </fieldset>
  );
}

export default WorkshopsFram;
